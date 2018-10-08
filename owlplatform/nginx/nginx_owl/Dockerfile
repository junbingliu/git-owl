FROM 45157963/nginx_base

MAINTAINER zxy@xinshi.net

#derived from https://github.com/liuwill-projects

COPY nginx.conf /usr/local/nginx/conf

EXPOSE 80 443


CMD ["nginx", "-g", "daemon off;"]