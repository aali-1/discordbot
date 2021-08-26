function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }
function findpls(array,elements){
    final = []
    for(j=0;j<elements;j++){
        new_str = ''
        for(i=0;i<array.length;i++){
        if(array[i] == ','){
            thing = i+1
            array.splice(0,thing)
            break
        }
        new_str += array[i]  
        }
        final[j] = new_str
    }
    return final  
}
module.exports = {
    name: 'randomize',
    description: "randomizes a bunch of names",
    execute(message, args){
        array1 = args
        yeet = array1[0]
        elements = 0
        for(i=0;i<yeet.length;i++){
            if(yeet[i]===","){
                elements +=1
            }
        }
        elements+=1
        yeet = Array.from(yeet)

        array = findpls(yeet,elements)
        message.channel.send(shuffle(array)) 
    }
}