class Json {
  static toString(obj){
    return JSON.stringify(obj, null, 2);
  }
}

module.exports = Json;
