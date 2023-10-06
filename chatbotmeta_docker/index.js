const flow3 = addKeyword(["Hola"])
.addAnswer("Estas en el flujo de encuesta 3, sin preguntas aún.",{delay:2000, capture:true}, (ctx) => {
    console.log("Contexto de conversacion: " + JSON.stringify(ctx));
});       
const main = async () => {        
    
    console.log("Obj flow3: " + JSON.stringify(flow3));
    const adapterDB = new MockAdapter();
    const adapterFlow = createFlow([flow3]);
    
    const adapterProvider = createProvider(MetaProvider, {
      jwtToken:
        "EAAIwYgUb2aUBO9vpEuOFhNKRAZB8fZBYZAAZAVwGQdh9w8ZCyZCWgQ5BvO6A1WSo2UbgY06qxVbmgzZALCgsxq3hKES5hGcXUY9qT8S1YkJe8u62IrCyedrQOudLyEQUJk4IGiVapFmT7PieKr0bzxqAJc3gHFfYqQ4HjteVpaXxMaQlmlh0cIXZApaeuGwTg7FIN94IJ1zVq4mDoLhuaLwgX2WfBKkZD",
      numberId: "126588747210216",
      verifyToken: "verifyToken",
      version: "v16.0",
    });

    createBot({
      flow: adapterFlow,
      provider: adapterProvider,
      database: adapterDB,
    });          
    console.log("adapterDB: " + JSON.stringify(adapterDB));
    console.log("AdapterProvider: " + JSON.stringify(adapterProvider));
    console.log("AdapterFlow: " + JSON.stringify(adapterFlow));
      //context.log("CreateBot: " + JSON.stringify(bot));         
  };

  main();