FROM centos

MAINTAINER zxy@xinshi.net

#derived from https://github.com/liuwill-projects

RUN mkdir /source
COPY *.gz /source/
RUN yum install -y deltarpm
RUN yum install -y gd-devel wget \
	&& yum -y install gcc gcc-c++ kernel-devel make \
	&& cd /source \
	&& tar -xzvf nginx-1.15.2.tar.gz \
	&& tar -xzvf pcre-8.42.tar.gz \
	&& cd nginx-1.15.2 \
	&& ./configure --prefix=/usr/local/nginx --with-http_image_filter_module --with-pcre=../pcre-8.42 \
	&& make \
	&& make install
	
#RUN echo -e 'PATH=$PATH:/usr/local/nginx/sbin\nexport PATH' >> /etc/profile 
#RUN source /etc/profile

COPY nginx.conf /usr/local/nginx/conf/

ENV	PATH /usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/local/nginx/sbin

VOLUME ["/upload"]

WORKDIR /var/www

EXPOSE 80 443


CMD ["nginx", "-g", "daemon off;"]