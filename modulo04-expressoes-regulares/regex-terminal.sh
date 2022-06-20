# Colocando 'use stric'; em todos os arquivos.

# 1 npm i -g ipt

#comando

find . -name *.js -not -path '*node_modules**' \
| ipt -o \
| xargs -I '{file}' sed -i "" -e '1s/^/\"use strict";\n/g' {file}