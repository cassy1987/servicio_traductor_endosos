exports.mapDynamicData = (templateData, input) => {
  return templateData.map((item) => {
    const matchKey = Object.keys(input).find(
      k => k.toLowerCase().includes(item.etiqueta.toLowerCase())
    );
    return {
      etiqueta: item.etiqueta,
      value: matchKey ? input[matchKey] : item.default
    };
  });
};

