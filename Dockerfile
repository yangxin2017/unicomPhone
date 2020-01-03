ARG harbor
#阿里云172.17.0.16:5000
#电厂 10.2.128.215:5000
FROM ${harbor}/ops/nginx

COPY www/ /usr/share/nginx/html/
