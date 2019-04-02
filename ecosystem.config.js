module.exports = {
  apps : [{
    name: 'Portal Magico - API',
    script: 'server/server.js',
    instances: 1,
    autorestart: true,
    watch: true,
    max_memory_restart: '512M',
    log_date_format: 'YYYY-MM-DD HH:mm:ss SSS',
    env: {
      NODE_ENV: 'dev'
    },
    env_stg: {
      NODE_ENV: 'stg'
    }
  }],
  deploy : {
    stg : {
      user : 'agminen',
      host : 'localhost:3005',
      ref  : process.env.DEPLOY_BRANCH,
      path : '/var/www/html/agminen/catalogo-virtual-api',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env stg'
    }
  }
};
