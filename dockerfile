FROM nginx:1.18.0
# 用户
ENV RUN_USER nginx
# 组
ENV RUN_GROUP nginx
# 项目目录
ENV DATA_DIR /data/web
# 日志目录
ENV LOG_DIR /data/log/nginx

RUN mkdir -p /data/log/nginx
RUN chown nginx.nginx -R /data/log/nginx

ADD ./dist $DATA_DIR
ADD ./build/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80