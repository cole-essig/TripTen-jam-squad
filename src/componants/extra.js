function distanceToDiv(div, span) {
    let recenterDistance;
  
    const spanRect = span.getBoundingClientRect();
    const divRect = div.getBoundingClientRect();
  
    const distanceToTop = divRect.top - spanRect.top;
    const distanceToBottom = divRect.bottom - spanRect.bottom;
    
    console.log(distanceToBottom + " " + distanceToTop)
    if (distanceToBottom < distanceToTop) {
      recenterDistance = distanceToBottom + 'px';
    } else {
      recenterDistance = distanceToTop + 'px';
    }
    recenterDistance = distanceToBottom + distanceToTop
  
    return recenterDistance;
  }
  
  function findClosestReelSpan(div) {
    const spans = div.querySelectorAll("span")
    
    let array = [];
    let resultArray = [];
  
    spans.forEach(span => {
      const spanRect = span.getBoundingClientRect();
      const divRect = div.getBoundingClientRect();
  
      const distanceToTop = divRect.top - spanRect.top;
      const distanceToBottom = divRect.bottom - spanRect.bottom;
  
      const distance = Math.min(distanceToTop, distanceToBottom);
      resultArray.push(distance);
    });
    return array = closestToZero(resultArray);
  }
  
  function closestToZero(numbers) {
    let closest = 0;
    let index;
      
      for (let i = 0; i < numbers.length ; i++) {
          if (closest === 0) {
              closest = numbers[i];
              index = [i];
          } else if (numbers[i] > 0 && numbers[i] <= Math.abs(closest)) {
              closest = numbers[i];
              index = [i];
          } else if (numbers[i] < 0 && - numbers[i] < Math.abs(closest)) {
              closest = numbers[i];
              index = [i];
          }
      }
      
      return [closest, index];
  }