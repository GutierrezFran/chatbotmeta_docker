const {
  createBot,
  createProvider,
  createFlow,
  addKeyword,
} = require("@bot-whatsapp/bot");

const MetaProvider = require("@bot-whatsapp/provider/meta");
const MockAdapter = require("@bot-whatsapp/database/mock");
const insertRecord = require("./googleSheet/insertRecord");
const textFromId = require("./utils/textFromId");
const conversation = require("./class/conversation");

//dotnet no agregado en la imagen subida en Azure antes del 13/10/23
require("dotenv").config();


let dataCollection = new conversation();

const flowPrincipal = addKeyword(["Encuesta1"])  
  .addAnswer(
    "Hola, soy un Chatbot de SASISOPA. Quisiera conocerte y hacerte unas preguntas.",
    {
      delay: 500,
    }
  )
  .addAnswer(
    "¿Cuál es tu nombre?",
    {
      capture: true,
      delay: 500,
    },
    async (ctx, { provider, endFlow }) => {
      
      if(ctx.body == "encuesta1" || ctx.body == "Encuesta1"){
        //limpiar Objeto de usuario y terminar flujo
        dataCollection.cleanObjectConversation(ctx.from);
        return endFlow({body: 'Se ha interrumpido el flujo. Escriba Encuesta1'});
      }
      
      //Nuevo arreglo de respuestas por usuario 
      dataCollection.newConversation(ctx.from);

      dataCollection.addElement(ctx.from, ctx.from);
      dataCollection.addElement(ctx.from, ctx.body);
      console.log("dataCollection P1: ", dataCollection);

      //Enviar mensaje de opciones
      const list = {
        header: {
          type: "text",

          text: "Encuesta",
        },

        body: {
          text: "¿Sobre cuál de estas campañas has oído hablar?",
        },

        footer: {
          text: "Presiona en opciones",
        },

        action: {
          button: "Opciones",

          sections: [
            {
              title: "Opciones",

              rows: [
                {
                  id: "id00001_seguridad",
                  title: "Opción 1",
                  description: "La importancia de la seguridad en los procesos",
                },

                {
                  id: "id00001_residuos",
                  title: "Opción 2",
                  description: "Manejo de residuos",
                },
                {
                  id: "id00001_vigilar",
                  title: "Opción 3",
                  description: "5 Claves para vigilar la seguridad",
                },
              ],
            },
          ],
        },
      };

      await provider.sendLists(ctx.from, list);
      //console.log('Objeto contexto:',ctx);
    }
  )
  .addAnswer(
    "Escoge una opción",
    {
      capture: true,
      delay: 500,
    },
    async (ctx, { endFlow }) => {
      //Guardar respuesta
      if(ctx.body == "encuesta1" || ctx.body == "Encuesta1"){
        dataCollection.cleanObjectConversation(ctx.from);
        return endFlow({body: 'Se ha interrumpido el flujo. Escriba Encuesta1'});
      }

      dataCollection.addElement(ctx.from, textFromId[ctx.body]);
      console.log("dataCollection P2: ", dataCollection);
    }
  )
  .addAnswer(
    "¿Recuerdas haber visto o escuchado anuncios o mensajes relacionados con la campaña TAL en los últimos dos meses?",
    {
      capture: true,

      buttons: [
        {
          body: "Sí",
        },
        {
          body: "No",
        },
      ],
    },
    async (ctx, { provider, endFlow }) => {
      if(ctx.body == "encuesta1" || ctx.body == "Encuesta1"){
        dataCollection.cleanObjectConversation(ctx.from);
        return endFlow({body: 'Se ha interrumpido el flujo. Escriba Encuesta1'});
      }
      
      dataCollection.addElement(ctx.from, ctx.body);
      console.log("dataCollection P3: ", dataCollection);

      const list = {
        header: {
          type: "text",

          text: "Encuesta",
        },

        body: {
          text: "¿Dónde encontraste información sobre LA CAMPAÑA? ",
        },

        footer: {
          text: "Presiona en opciones",
        },

        action: {
          button: "Opciones",

          sections: [
            {
              title: "Opciones",

              rows: [
                {
                  id: "id00002_cartel",
                  title: "Opción 1",
                  description: "Cartel",
                },
                {
                  id: "id00002_redes",
                  title: "Opción 2",
                  description: "Redes sociales",
                },
                {
                  id: "id00002_video",
                  title: "Opción 3",
                  description: "Video",
                },
                {
                  id: "id00002_podcast",
                  title: "Opción 4",
                  description: "Podcast",
                },
                {
                  id: "id00002_pagina",
                  title: "Opción 5",
                  description: "Página web",
                },
                {
                  id: "id00002_articulo",
                  title: "Opción 6",
                  description: "Artículo promocional",
                },
              ],
            },
          ],
        },
      };

      await provider.sendLists(ctx.from, list);
      //console.log(ctx);
    }
  )
  .addAnswer(
    "Escoge una opción",
    {
      capture: true,
      delay: 500,
    },
    async (ctx, { provider, endFlow }) => {
      //console.warn("Ctx dentro de function: ", ctx.title_list_reply);
      
      if(ctx.body == "encuesta1" || ctx.body == "Encuesta1"){
        dataCollection.cleanObjectConversation(ctx.from);
        return endFlow({body: 'Se ha interrumpido el flujo. Escriba Encuesta1'});
      }
      
      dataCollection.addElement(ctx.from, textFromId[ctx.body]);

      console.log("dataCollection p4: ", dataCollection);

      const list = {
        header: {
          type: "text",

          text: "Encuesta",
        },

        body: {
          text: "¿Cuál de los siguientes mensajes recuerdas más? ",
        },

        footer: {
          text: "Presiona en opciones",
        },

        action: {
          button: "Opciones",

          sections: [
            {
              title: "Opciones",

              rows: [
                {
                  id: "id00003_seguridad_depende",
                  title: "Opción 1",
                  description: "La seguridad depende de ti",
                },
                {
                  id: "id00003_permiso_trabajo",
                  title: "Opción 2",
                  description: "Un permiso de trabajo es un seguro de vida",
                },
                {
                  id: "id00003_trabajo_seguro",
                  title: "Opción 3",
                  description: "Trabaja seguro, Trabaja con EPP",
                },
              ],
            },
          ],
        },
      };

      await provider.sendLists(ctx.from, list);
      //console.log(ctx);
    }
  )
  .addAnswer(
    "Escoge un opción",
    {
      capture: true,
      delay: 500,
    },
    async (ctx, { provider, endFlow }) => {
      console.log(ctx.title_list_reply);
      
      if(ctx.body == "encuesta1" || ctx.body == "Encuesta1"){
        dataCollection.cleanObjectConversation(ctx.from);
        return endFlow({body: 'Se ha interrumpido el flujo. Escriba Encuesta1'});
      }
      
      dataCollection.addElement(ctx.from, textFromId[ctx.body]);
      console.log("dataCollection p5: ", dataCollection);

      const list = {
        header: {
          type: "text",

          text: "Encuesta",
        },

        body: {
          text: "¿Cuál de las siguientes acciones promueve la campaña? ",
        },

        footer: {
          text: "Presiona en opciones",
        },

        action: {
          button: "Opciones",

          sections: [
            {
              title: "Opciones",

              rows: [
                {
                  id: "id00004_uso_epp",
                  title: "Opción 1",
                  description: "Uso del EPP",
                },
                {
                  id: "id00004_manejo_residuos",
                  title: "Opción 2",
                  description: "Manejo de residuos",
                },
                {
                  id: "id00004_procedimientos",
                  title: "Opción 3",
                  description: "Procedimientos seguros",
                },
                {
                  id: "id00004_ninguno",
                  title: "Opción 4",
                  description: "Ninguno de los anteriores",
                },
              ],
            },
          ],
        },
      };

      await provider.sendLists(ctx.from, list);
      //console.log(ctx);
    }
  )
  .addAnswer(
    "Escoge una opción",
    {
      capture: true,
      delay: 500,
    },
    (ctx, { endFlow }) => {
      //Guardar respuesta
      if(ctx.body == "encuesta1" || ctx.body == "Encuesta1"){
        dataCollection.cleanObjectConversation(ctx.from);
        return endFlow({body: 'Se ha interrumpido el flujo. Escriba Encuesta1'});
      }
      
      dataCollection.addElement(ctx.from, textFromId[ctx.body]);
      console.log("dataCollection p5: ", dataCollection);
    }
  )
  .addAnswer(
    "¿Consideras que la información proporcionada es útil para tus actividades?",
    {
      capture: true,
      delay: 500,
      buttons: [
        {
          body: "Sí",
        },
        {
          body: "No",
        },
      ],
    },
    async (ctx, { provider, endFlow }) => {
      if(ctx.body == "encuesta1" || ctx.body == "Encuesta1"){
        dataCollection.cleanObjectConversation(ctx.from);
        return endFlow({body: 'Se ha interrumpido el flujo. Escriba Encuesta1'});
      }
      
      dataCollection.addElement(ctx.from, ctx.body);
      console.log("dataCollection p6: ", dataCollection);
      //Envia siguiente lista
      const list = {
        header: {
          type: "text",

          text: "Encuesta",
        },

        body: {
          text: "¿Con que frecuencia has visto o interactuado con anuncios o mensajes de la campaña en las últimas semanas?",
        },

        footer: {
          text: "Presiona en opciones",
        },

        action: {
          button: "Opciones",

          sections: [
            {
              title: "Opciones",

              rows: [
                {
                  id: "id00005_muy_frecuente",
                  title: "Opción 1",
                  description: "Muy frecuente",
                },
                {
                  id: "id00005_nada_frecuente",
                  title: "Opción 2",
                  description: "Nada frecuente",
                },
                {
                  id: "id00005_nada",
                  title: "Opción 3",
                  description: "No he visto nada",
                },
              ],
            },
          ],
        },
      };

      await provider.sendLists(ctx.from, list);
      //console.log(ctx);
    }
  )
  .addAnswer(
    "Escoge una opción",
    {
      capture: true,
      delay: 500,
    },
    async (ctx, { provider, endFlow }) => {
      //console.log("Title: ", ctx.title_list_reply);
      if(ctx.body == "encuesta1" || ctx.body == "Encuesta1"){
        dataCollection.cleanObjectConversation(ctx.from);
        return endFlow({body: 'Se ha interrumpido el flujo. Escriba Encuesta1'});
      }
      
      dataCollection.addElement(ctx.from, textFromId[ctx.body]);
      console.log("dataCollection p7: ", dataCollection);

      const list = {
        header: {
          type: "text",

          text: "Encuesta",
        },

        body: {
          text: "En una escala del 1 al 5, ¿Qué tan efectiva te pareció la campaña TAL en transmitir su mensaje? ",
        },

        footer: {
          text: "Presiona opciones",
        },

        action: {
          button: "Opciones",

          sections: [
            {
              title: "Opciones",

              rows: [
                {
                  id: "id00006_inefectiva",
                  title: "Opción 1",
                  description: "Inefectiva",
                },
                {
                  id: "id00006_poco_efectiva",
                  title: "Opción 2",
                  description: "Poco efectiva",
                },
                {
                  id: "id00006_efectiva",
                  title: "Opción 3",
                  description: "Efectiva",
                },
                {
                  id: "id00006_muy_efectiva",
                  title: "Opción 4",
                  description: "Muy efectiva",
                },
                {
                  id: "id00006_altamente_efectiva",
                  title: "Opción 5",
                  description: "Altamente efectiva",
                },
              ],
            },
          ],
        },
      };

      await provider.sendLists(ctx.from, list);
      //console.log(ctx);
    }
  )
  .addAnswer(
    "Escoge una opción",
    {
      capture: true,
      delay: 500,
    },
    async (ctx, { endFlow }) => {
      //console.log(ctx.title_list_reply);      
      if(ctx.body == "encuesta1" || ctx.body == "Encuesta1"){
        dataCollection.cleanObjectConversation(ctx.from);
        return endFlow({body: 'Se ha interrumpido el flujo. Escriba Encuesta1'});
      }
      
      dataCollection.addElement(ctx.from, textFromId[ctx.body]);
      console.log("dataCollection p8: ", dataCollection);
    }
  )

  //Ultima pregunta, abierta
  .addAnswer(
    "Menciona algo específico que te haya gustado de la campaña: (Respuesta abierta)",
    {
      capture: true,
      delay: 500,
    },
    async (ctx, { endFlow }) => {
      //Guardar respuesta
      if(ctx.body == "encuesta1" || ctx.body == "Encuesta1"){
        dataCollection.cleanObjectConversation(ctx.from);
        return endFlow({body: 'Se ha interrumpido el flujo. Escriba Encuesta1'});
      }
      
      dataCollection.addElement(ctx.from, ctx.body);

      let user = dataCollection.getDataConversation(ctx.from);
      /*
      * NAME QUIZ1 = 
      */
      await insertRecord.createRecord(user, process.env.SHEETNAME_QUIZ1);
      
    }
  )

  .addAnswer("Estoy registrando tus respuestas, espera un momento por favor.")
  //agradecimiento
  .addAnswer(
    "Tus respuestas han quedado registradas exitosamente. Gracias.",
    {
      delay: 2500,
    },
    (ctx, { endFlow }) => {
      dataCollection.cleanObjectConversation(ctx.from);
      return endFlow();
    }
  );

//============Flujo de encuesta para campaña 2 ===================//
const flow2 = addKeyword(["Encuesta2"])
  .addAnswer("Hola, soy el chatbot de SASISOPA, que gusto tenerte aquí. Estás en la encuesta 2.")
  .addAnswer(
    "¿Cuál es tu nombre?",
    {
      capture: true,
      delay: 800
    },
    async (ctx, { endFlow }) => {
      if(ctx.body == "encuesta2" || ctx.body == "Encuesta2"){
        dataCollection.cleanObjectConversation(ctx.from);
        return endFlow({body: 'Se ha interrumpido el flujo. Escriba Encuesta2'});
        
      }else if(ctx.body == "encuesta2" || ctx.body == "Encuesta2"){
        dataCollection.cleanObjectConversation(ctx.from);
        return endFlow({ body: 'Escribe Encuesta2 ya que Encuesta1 es una palabra reservada' });
      }              
      //Guardar respuesta
      dataCollection.newConversation(ctx.from);
      
      dataCollection.addElement(ctx.from, ctx.from);
      dataCollection.addElement(ctx.from, ctx.body);
      console.log('Collect2:',dataCollection)
      
    }
  )
  .addAnswer(
    "¿Estás al tanto de la campaña de Manejo de Residuos del SASISOPA en nuestra organización?",
    {
      capture: true,
      buttons: [
        {
          body: "Sí",
        },
        {
          body: "No",
        },
      ],
    },
    async (ctx, { endFlow }) => {
      
      if(ctx.body == "encuesta2" || ctx.body == "Encuesta2"){
        dataCollection.cleanObjectConversation(ctx.from);
        return endFlow({body: 'Se ha interrumpido el flujo. Escriba Encuesta2'});
      }else if(ctx.body == "encuesta1" || ctx.body == "Encuesta1"){
        return endFlow(
          {
            body: 'Escribe Encuesta2 ya que Encuesta1 es una palabra reservada', 
            /*
            buttons: [
              {
                body: "Encuesta 1"
              },
            ]*/
          }
        );
      }        
      console.log("Respuesta 1 flow2", ctx.body);
      dataCollection.addElement(ctx.from, ctx.body);
      console.log('Collect2:',dataCollection)
    }
  )
  .addAnswer(
    "¿Has participado en alguna actividad o programa relacionado con la campaña de Manejo de Residuos del SASISOPA?",
    {
      capture: true,
      buttons: [
        {
          body: "Sí",
        },
        {
          body: "No",
        },
      ],
    },
    async (ctx, { endFlow }) => {
      if(ctx.body == "encuesta2" || ctx.body == "Encuesta2"){
        dataCollection.cleanObjectConversation(ctx.from);
        return endFlow({body: 'Se ha interrumpido el flujo. Escriba Encuesta2'});
      }
      console.log("Respuesta 2 flow2", ctx.body);
      dataCollection.addElement(ctx.from, ctx.body);
      console.log('Collect2:',dataCollection)
    }
  )
  .addAnswer(
    "¿Recuerdas cuál es el mensaje clave de la campaña de Manejo de Residuos?",
    {
      capture: true,
      buttons: [
        {
          body: "Sí",
        },
        {
          body: "No",
        },
      ],
    },
    async (ctx, { provider, endFlow }) => {
      if(ctx.body == "encuesta2" || ctx.body == "Encuesta2"){
        dataCollection.cleanObjectConversation(ctx.from);
        return endFlow({body: 'Se ha interrumpido el flujo. Escriba Encuesta2'});
      }
      
      console.log("Respuesta 3 flow2", ctx.body);
      dataCollection.addElement(ctx.from, ctx.body);
      console.log('Collect2:',dataCollection)

      const list = {
        header: {
          type: "text",

          text: "Encuesta 2",
        },

        body: {
          text: "En una escala del 1 al 5, ¿qué tan informativa te pareció la campaña en términos de cómo manejar adecuadamente los residuos? (1 siendo 'poco informativa', 5 siendo 'muy informativa')",
        },

        footer: {
          text: "Presiona opciones",
        },

        action: {
          button: "Opciones",

          sections: [
            {
              title: "Opciones",

              rows: [
                {
                  id: "id00007_no_informativa",
                  title: "Opción 1",
                  description: "No informativa",
                },
                {
                  id: "id00007_poco_informativa",
                  title: "Opción 2",
                  description: "Poco infomativa",
                },
                {
                  id: "id00007_informativa",
                  title: "Opción 3",
                  description: "Informativa",
                },
                {
                  id: "id00007_muy_informativa",
                  title: "Opción 4",
                  description: "Muy informativa",
                },
                {
                  id: "id00007_altamente_informativa",
                  title: "Opción 5",
                  description: "Altamente informativa",
                },
              ],
            },
          ],
        },
      };

      await provider.sendLists(ctx.from, list);
      
    }
  )
  .addAnswer(
    "Escoge una opción",
    {
      capture: true,
    },
    async (ctx, { provider, endFlow }) => {
      if(ctx.body == "encuesta2" || ctx.body == "Encuesta2"){
        dataCollection.cleanObjectConversation(ctx.from);
        return endFlow({body: 'Se ha interrumpido el flujo. Escriba Encuesta2'});
      }
      
      console.log("Respuesta 4 flow2", textFromId[ctx.body]);
      dataCollection.addElement(ctx.from, textFromId[ctx.body]);
      console.log('Collect2:',dataCollection)

      const list = {
        header: {
          type: "text",

          text: "Encuesta 2",
        },

        body: {
          text: "¿Has cambiado tus hábitos de manejo de residuos como resultado de la campaña?",
        },

        footer: {
          text: "Presiona opciones",
        },

        action: {
          button: "Opciones",

          sections: [
            {
              title: "Opciones",

              rows: [
                {
                  id: "id00008_si_mejorado",
                  title: "Opción 1",
                  description:
                    "Sí, he mejorado mis prácticas de manejo de residuos.",
                },
                {
                  id: "id00008_si_comenzado",
                  title: "Opción 2",
                  description:
                    "Sí, he comenzado a reciclar o a reducir mi producción de residuos.",
                },
                {
                  id: "id00008_no_siguen",
                  title: "Opción 3",
                  description:
                    "No, mis hábitos de manejo de residuos siguen siendo los mismos.",
                },
                {
                  id: "id00008_no_estoy_seguro",
                  title: "Opción 4",
                  description: "No estoy seguro.",
                },
              ],
            },
          ],
        },
      };

      await provider.sendLists(ctx.from, list);
      
    }
  )
  .addAnswer(
    "Escoge una opción",
    {
      capture: true,
    },
    async (ctx, { endFlow }) => {
      if(ctx.body == "encuesta2" || ctx.body == "Encuesta2"){
        dataCollection.cleanObjectConversation(ctx.from);
        return endFlow({body: 'Se ha interrumpido el flujo. Escriba Encuesta2'});
      }
      
      console.log("Respuesta 5 flow2", textFromId[ctx.body]);
      dataCollection.addElement(ctx.from, textFromId[ctx.body]);
      console.log('Collect2:',dataCollection)
    }
  )
  .addAnswer(
    "¿Has compartido información o consejos de la campaña de Manejo de Residuos con tus colegas o amigos?",
    {
      capture: true,
      buttons: [
        {
          body: "Sí",
        },
        {
          body: "No",
        },
      ],
    },
    async (ctx, { provider, endFlow }) => {
      if(ctx.body == "encuesta2" || ctx.body == "Encuesta2"){
        dataCollection.cleanObjectConversation(ctx.from);
        return endFlow({body: 'Se ha interrumpido el flujo. Escriba Encuesta2'});
      }
      
      console.log("Respuesta 6 flow2", ctx.body);
      dataCollection.addElement(ctx.from, ctx.body);
      console.log('Collect2:',dataCollection)
      
      const list = {
        header: {
          type: "text",

          text: "Encuesta 2",
        },

        body: {
          text: "¿Crees que la campaña ha tenido un impacto positivo en la reducción de residuos en nuestra organización?",
        },

        footer: {
          text: "Presiona opciones",
        },

        action: {
          button: "Opciones",

          sections: [
            {
              title: "Opciones",

              rows: [
                {
                  id: "id00009_si_impacto_positivo",
                  title: "Opción 1",
                  description: "Sí",
                },
                {
                  id: "id00009_no_impacto_positivo",
                  title: "Opción 2",
                  description: "No",
                },
                {
                  id: "id00009_no_seguro_impacto",
                  title: "Opción 3",
                  description: "No estoy seguro",
                },
              ],
            },
          ],
        },
      };

      await provider.sendLists(ctx.from, list);
    }
  )
.addAnswer(
    "Escoge una opción",
    {
      capture: true,
    },
    async (ctx, { endFlow }) => {
      if(ctx.body == "encuesta2" || ctx.body == "Encuesta2"){
        dataCollection.cleanObjectConversation(ctx.from);
        return endFlow({body: 'Se ha interrumpido el flujo. Escriba Encuesta2'});
      }
      
      console.log("Respuesta 7 flow2", textFromId[ctx.body]);
      dataCollection.addElement(ctx.from, textFromId[ctx.body]);
      console.log('Collect2:',dataCollection)
    }
  )
.addAnswer(
    "¿Qué sugerencias tienes para mejorar la efectividad de futuras campañas de Manejo de Residuos del SASISOPA? (Respuesta abierta)",
    {
      capture: true,
    },
    async (ctx) => {
      console.log("Respuesta 8 flow2", ctx.body);
      
      dataCollection.addElement(ctx.from, ctx.body);
      console.log('Collect2:',dataCollection)
      //Finalizar flujo después de insertar
      let user_Quiz2 = dataCollection.getDataConversation(ctx.from)
      await insertRecord.createRecord(user_Quiz2, process.env.SHEETNAME_QUIZ2);   
      dataCollection.cleanObjectConversation(ctx.from);
    }
  )
.addAnswer(
  'Estoy registrando tus respuestas, espera un momento por favor.',
  {
    delay:500
  }
)
.addAnswer(
  'Tus respuestas han quedado registradas exitosamente. Gracias.',
  {
    delay: 1000
  },
  async (ctx, { endFlow }) => {
    console.log('Finalizando encuesta 2')
    return endFlow();
  }
)

//===================Flujo de encuesta para campaña 3=============================//
const flow3 = addKeyword(["Encuesta3"])
  .addAnswer(
  "Estas en el flujo de encuesta 3, sin preguntas aún.",
    async (ctx, { endFlow }) => {
      
      //Finalizando
      return endFlow();
      
    }
);

//Integrando los dos flujos en el adaptador
const main = async () => {
  const adapterDB = new MockAdapter();
  const adapterFlow = createFlow([flowPrincipal, flow2, flow3]);

  const adapterProvider = createProvider(MetaProvider, {
    jwtToken:
      "token-permanente_temp-apiWhatsapp",
    numberId: "id-numero-registrado-en-cuenta-comercial",
    verifyToken: "palabra-para-enlazar-con-meta",
    version: "v16.0",
  });
  
  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });
};

main();
