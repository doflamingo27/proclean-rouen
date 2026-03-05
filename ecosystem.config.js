module.exports = {
  apps: [
    {
      name: 'proclean-rouen',
      script: 'node_modules/.bin/next',
      args: 'start -p 3001',
      cwd: '/var/www/proclean-rouen',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
      },
    },
  ],
};
