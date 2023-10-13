import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shuffle'
})
export class ShufflePipe implements PipeTransform {
  transform(array: any[]): any[] {
    // Make a copy of the input array to avoid modifying the original array
    const copiedArray = [...array];

    // Shuffle the copied array using the Fisher-Yates algorithm
    let currentIndex = copiedArray.length;
    let randomIndex, temporaryValue;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      temporaryValue = copiedArray[currentIndex];
      copiedArray[currentIndex] = copiedArray[randomIndex];
      copiedArray[randomIndex] = temporaryValue;
    }

    return copiedArray;
  }
}
