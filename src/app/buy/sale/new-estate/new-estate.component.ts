import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PageTitleService } from '../../../services/page-title.service';
import { PageHeaderComponent } from '../../../templates/page-header/page-header.component';

@Component({
  selector: 'app-new-estate',
  templateUrl: './new-estate.component.html',
  styleUrls: ['./new-estate.component.scss']
})

export class NewEstateComponent {
  propertyCards = [
    [
      {
        currentIndex: 0,
        images: [
        '/assets/images/houses/house1.jpg',
        '/assets/images/houses/house2.jpg',
        '/assets/images/houses/house3.jpg',
        '/assets/images/houses/house4.jpg',
      ],
        propertyName: 'Meridan Villa',
        propertyPrice: '$270,000',
        propertyAddress: 'Cnr Lytton/Bristol R Workington',
        propertyType: "For Rent",
      },
      // Add more property cards for the first set...
    ],
    [
      {
        currentIndex: 0,
        images: [
        '/assets/images/houses/house1.jpg',
        '/assets/images/houses/house2.jpg',
        '/assets/images/houses/house3.jpg',
        '/assets/images/houses/house4.jpg',
      ],
        propertyName: 'Another Property',
        propertyPrice: '$350,000',
        propertyAddress: '123 Main Street',
        propertyType: "For Sale",
      },
      
    ],
    [
      {
        currentIndex: 0,
        images: [
        '/assets/images/houses/house1.jpg',
        '/assets/images/houses/house2.jpg',
        '/assets/images/houses/house3.jpg',
        '/assets/images/houses/house4.jpg',
      ],
        propertyName: 'Another Property',
        propertyPrice: '$350,000',
        propertyAddress: '123 Main Street',
        propertyType: "For Sale",
      },
      
    ],

    [
      {
        currentIndex: 0,
        images: [
        '/assets/images/houses/house1.jpg',
        '/assets/images/houses/house2.jpg',
        '/assets/images/houses/house3.jpg',
        '/assets/images/houses/house4.jpg',
      ],
        propertyName: 'Another Property',
        propertyPrice: '$350,000',
        propertyAddress: '123 Main Street',
        propertyType: "For Sale",
      },
      
    ],

    [
      {
        currentIndex: 0,
        images: [
        '/assets/images/houses/house1.jpg',
        '/assets/images/houses/house2.jpg',
        '/assets/images/houses/house3.jpg',
        '/assets/images/houses/house4.jpg',
      ],
        propertyName: 'Another Property',
        propertyPrice: '$350,000',
        propertyAddress: '123 Main Street',
        propertyType: "For Sale",
      },
      
    ],

    [
      {
        currentIndex: 0,
        images: [
        '/assets/images/houses/house1.jpg',
        '/assets/images/houses/house2.jpg',
        '/assets/images/houses/house3.jpg',
        '/assets/images/houses/house4.jpg',
      ],
        propertyName: 'Another Property',
        propertyPrice: '$350,000',
        propertyAddress: '123 Main Street',
        propertyType: "For Sale",
      },
      
    ],

    [
      {
        currentIndex: 0,
        images: [
        '/assets/images/houses/house1.jpg',
        '/assets/images/houses/house2.jpg',
        '/assets/images/houses/house3.jpg',
        '/assets/images/houses/house4.jpg',
      ],
        propertyName: 'Another Property',
        propertyPrice: '$350,000',
        propertyAddress: '123 Main Street',
        propertyType: "For Sale",
      },
      
    ],

    [
      {
        currentIndex: 0,
        images: [
        '/assets/images/houses/house1.jpg',
        '/assets/images/houses/house2.jpg',
        '/assets/images/houses/house3.jpg',
        '/assets/images/houses/house4.jpg',
      ],
        propertyName: 'Another Property',
        propertyPrice: '$350,000',
        propertyAddress: '123 Main Street',
        propertyType: "For Sale",
      },
      
    ],
    
  ];

  currentIndexArray: number[] = [];
  currentIndex: number = 0;
  autoplayInterval: number = 3000;

  slideConfig = {
  autoplay: true,
  dots: true,
  arrows: false
};

  constructor(private titleService: Title, private pageTitleService: PageTitleService){}
  ngOnInit(){
    this.titleService.setTitle("New Estates");
    this.pageTitleService.setPageTitle("New Estates");

    setTimeout(() => {
    // Call nextImage for each card set
    this.propertyCards.forEach((cardSet, setIndex) => {
      // Assuming you want to advance the first card in each set
      this.nextImage(setIndex, 0);
    });
  }, 500);
             for (let i = 0; i < this.propertyCards.length; i++) {
    this.currentIndexArray.push(0);
  }

  this.propertyCards.forEach(cardSet => {
      cardSet.forEach(card => {
        card.images = this.shuffle(card.images);
      });
    });
  }

  nextImage(setIndex: number, cardIndex: number): void {
    const currentCard = this.propertyCards[setIndex][cardIndex];
    currentCard.currentIndex = (currentCard.currentIndex + 1) % currentCard.images.length;
    this.currentIndexArray[setIndex] = currentCard.currentIndex;
    console.log(`nextImage called for setIndex: ${setIndex}, cardIndex: ${cardIndex}`);
  }

  // Move to the previous image of a given card
  prevImage(setIndex: number, cardIndex: number): void {
    const currentCard = this.propertyCards[setIndex][cardIndex];
    currentCard.currentIndex = (currentCard.currentIndex - 1 + currentCard.images.length) % currentCard.images.length;
    this.currentIndexArray[setIndex] = currentCard.currentIndex;
    console.log(`prevImage called for setIndex: ${setIndex}, cardIndex: ${cardIndex}`);
  }


 // Get the class name for a dot based on the current image index and the set index
  getDotClass(index: number, setIndex: number): string {
    return index === this.currentIndexArray[setIndex] ? 'dot active' : 'dot';
  }

  // Go to a specific image of a given set
goToImage(index: number, setIndex: number): void {
  this.propertyCards[setIndex][0].currentIndex = index;
  this.currentIndexArray[setIndex] = this.propertyCards[setIndex][0].currentIndex;
}



  shuffle(array: any[]){
    let currentIndex = array.length, randomIndex;
  
    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }


}
