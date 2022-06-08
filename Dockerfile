FROM aflplusplus/aflplusplus as fuzzer-base

RUN apt-get update && apt-get full-upgrade -y && \
    apt-get -y install --no-install-suggests --no-install-recommends \
    curl python3-six python3-pip

# prevents python createnig .pyc files
ENV PYTHONDONTWRITEBYTECODE 1
# python
ENV PYTHONUNBUFFERED 1
# pip
ENV PIP_NO_CACHE_DIR=off
ENV PIP_DISABLE_PIP_VERSION_CHECK=on
ENV PIP_DEFAULT_TIMEOUT=100
# paths
ENV JS_SETUP_PATH="/afl-idl2js/js-ast-parser"

COPY . /afl-idl2js
WORKDIR /afl-idl2js

# install nodejs
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get install -y nodejs

# install python deps
RUN pip install -r requirements.txt

# install nodejs deps
WORKDIR $JS_SETUP_PATH
RUN npm install

# AFLplusplus mutator
ENV AFL_PYTHON_MODULE=afl_mutator
ENV PYTHONPATH=/afl-idl2js/afl_idl2js
ENV AFL_CUSTOM_MUTATOR_ONLY=1
