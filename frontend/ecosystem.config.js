module.exports = {
    apps : [{
        name: "frontend",
        script: "node_modules/react-scripts/scripts/start.js",
        cwd: "/home/ec2-user/linkedin/current/frontend",
        log_date_format: "DD-MM-YYYY",
        "env": {
            "NODE_ENV": "production",
        }
    }],
    deploy: {
        production: {
            key: "~/.ssh/id_rsa",
            user: "ec2-user",
            host: ["54.183.19.125", "54.193.121.188"],
            ssh_options: "StrictHostKeyChecking=no",
            ref: "origin/master",
            repo: "git@github.com:saketthakare/cmpe-273-group-project.git",
            path: "/home/ec2-user/linkedin",
            "post-deploy": "cd frontend && npm install && pm2 startOrRestart ecosystem.config.js"
        }
    }
}
