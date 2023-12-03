import React from 'react';

class Helper extends React.Component {

    capitalize(sentence) {
        // check if the sentence is not empty
        if (!sentence) {
            return sentence;
        }

        // capitalize the first character of the first word in the sentence
        const words = sentence.split(' ');
        if (words.length > 0) {
            words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
        }

        return words.join(' ');
    }

     toCurrency(num) {
        // check if num is a valid number
        if (typeof num !== 'number' || isNaN(num)) {
          return 'Invalid Number';
        }
        return num.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD'
        });
      }
      
}

export default Helper;
