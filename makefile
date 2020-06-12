projecrName = vma-vue-ts-demo
version = latest
port = 8080

build-%:
	npm run build -env=$* && docker build -t $(projecrName):$(version) .
serve:
	docker run -d --name $(projecrName) -p 127.0.0.1:$(port):80 $(projecrName):$(version)