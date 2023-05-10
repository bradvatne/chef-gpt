//Get the YouTube video ID from the url provided
export const youtubeParser = (text: string): string | false => {
  var regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = text.match(regExp);
  return match && match[7].length == 11 ? match[7] : "";
};

//Splits up the transcript input so that it can be kept within the range
export const divideTranscript = (str: string) => {
  const chunkSize = 3000;
  let arr = [];
  let i = 0;
  while (i < str.length) {
    let endIndex = i + chunkSize;
    if (endIndex < str.length) {
      endIndex = str.lastIndexOf(" ", endIndex);
    }
    arr.push(str.slice(i, endIndex));
    i = endIndex;
  }
  return arr;
};
