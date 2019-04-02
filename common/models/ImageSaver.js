'use strict';
const crypto = require('crypto');
const _ = require('lodash');
const multiparty = require('multiparty');
const fs = require('fs-extra')
const log4js = require('log4js');
const logger = log4js.getLogger('ImageSaver');


class ImageSaver {

    constructor(containerName) {
        // always initialize all instance properties
        this.containerName = containerName;
    }

    async updateUploadedFileNames(metadataFiles, entity) {
        const fileNames = metadataFiles.map(metadata => { return metadata.fileName });        
        await entity.updateImageFileName(entity, fileNames, metadataFiles);
    }

    saveFile(file, entity) {
        const uniqueFile = file //we realy receive just one file per association               
        const newFileName = this.changeFileNameFor(uniqueFile, entity)
        var tmp_path = uniqueFile.path
        var target_dir = `${this.containerName}`;
        const target_path = target_dir + newFileName
        fs.moveSync(tmp_path, target_path);
        return {
            fileName: newFileName,
            uid: uniqueFile.fieldName,
        };
    }

    // class methods
    async saveImages(files, entity) {
        if (!_.isEmpty(files)) {
            const metadataFiles = _.values(files).map(file => this.saveFile(file, entity));                        
            await this.updateUploadedFileNames(metadataFiles, entity);
            return metadataFiles;    
        }

    }

    changeFileNameFor(file, entity) {
        const { originalFilename, headers } = file;
        const type = headers["content-type"];
        const indexOfSlash = type.lastIndexOf('/');
        const fileType = type.slice(indexOfSlash + 1);
        const uploadedDate = new Date().getMilliseconds()* Math.random().toString();
        const hash = crypto.createHash('sha1').update(originalFilename + uploadedDate).digest('hex');
        return `${hash}_${entity.sufixForFileName(entity)}.${fileType}`;
    }

}
// export the class

module.exports = ImageSaver