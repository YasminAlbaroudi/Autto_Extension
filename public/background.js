async function backgroundRun({ workflow, DS_functions }) {
  const chrome = window.chrome;
  const preparedNodes = JSON.parse(workflow.nodes).map((node) => {
    const definedFunction = DS_functions[node.data.function.category].find(
      (func) => {
        if (func.id === node.data.function.id) {
          return func;
        }
      }
    );
    return {
      ...node,
      data: {
        ...node.data,
        function: {
          ...node.data.function,
          function: definedFunction.function,
        },
      },
    };
  });
  const nodes = preparedNodes;
  const trigger = nodes.filter(
    (node) => node.data.function.category === "Trigger"
  );
  let currentSource = trigger[0].id;
  let references = {};
  let edges = JSON.parse(workflow.edges);
  for (let i = 0; i < edges.length; i++) {
    let currentEdge = edges.find((edge) => {
      if (edge.source === currentSource) {
        return edge;
      }
    });
    let currentNode = nodes.find((node) => {
      if (node.id === currentEdge.target) {
        return node;
      }
    });
    let currentNodeGlobalID = currentNode.id;
    currentNode = currentNode.data.function;
    let currentNodeParams = currentNode.params.map((param) => {
      if (param.value.startsWith("REF_")) {
        return { ...param, value: references[param.value] };
      }
      return param;
    });
    console.log("Current NODEEEEE", currentNode);
    console.log(currentNodeParams);
    console.log("STOP ME HERE   ");
    console.log("NODE FUNCTION", currentNode.function);
    if (currentNode.category !== "Flow" && currentNode.name !== "END") {
      // let currentValue = "";
      // currentValue = await backgroundDs_functions[currentNode.category][
      //   currentNode.id
      // ](currentNodeParams);
      // // currentNode.function(currentNodeParams);
      // references[`REF_${currentNodeGlobalID}`] = currentValue;
      // currentSource = currentEdge.target;
      // console.log(references);


      // chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      //   chrome.tabs.sendMessage(tabs[0].id, {
      //     message: "run",
      //     data: {
      //       function: currentNode.function,
      //       params: currentNodeParams,
      //     },
      //   });
      // });


    //     let currentValue = "";
    if(currentNode.enviroment === "background"){
      let currentValue = await currentNode.function(currentNodeParams);
      references[`REF_${currentNodeGlobalID}`] = currentValue;
    }else{
      let response = await runFunction({category: currentNode.category,id: currentNode.id,params: currentNodeParams});
      console.log("RESPONSE", response);
      if (response === undefined) {
        response = {};
        response.value = "default response";
      }
      references[`REF_${currentNodeGlobalID}`] = response.value;
  }
    currentSource = currentEdge.target;
    console.log("I AM REFERENCES IN THE RESPONSE", references);

  
    }
  }
}

async function runFunction({ category, id, params }) {
  return new Promise((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, async function (tabs) {
      const tabId = tabs[0].id;
      if(tabs[0].status !== "complete"){
      chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
        if (changeInfo.status === "complete" && tabId === tabs[0].id) {
          chrome.tabs.sendMessage(
            tabId,
            {
              message: "run",
              data: {
                category: category,
                id: id,
                params: params,
              },
            },
            {},
            async function (response) {
              console.log("RESPONSE", response);
              if (response === undefined) {
                response = {};
                response.value = "default response";
              }
              if (response?.value === undefined) {
                response.value = "default response";
              }
              // references[`REF_${currentNodeGlobalID}`] = response.value;
              // currentSource = currentEdge.target;
              // console.log("I AM REFERENCES IN THE RESPONSE", references);
              resolve(response);
            }
          );
          chrome.tabs.onUpdated.removeListener(listener);
        }
      });
    }else{
      await new Promise((resolve) => setTimeout(resolve, 1500));
      chrome.tabs.sendMessage(
        tabId,
        {
          message: "run",
          data: {
            category: category,
            id: id,
            params: params,
          },
        },
        {},
        async function (response) {
          console.log("RESPONSE", response);
          if (response === undefined) {
            response = {};
            response.value = "default response";
          }
          if (response?.value === undefined) {
            response.value = "default response";
          }
          // references[`REF_${currentNodeGlobalID}`] = response.value;
          // currentSource = currentEdge.target;
          // console.log("I AM REFERENCES IN THE RESPONSE", references);
          resolve(response);
        }
      );

    }
    });
  });
}
