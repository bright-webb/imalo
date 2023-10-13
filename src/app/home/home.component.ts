import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CarouselService } from 'ngx-owl-carousel-o/lib/services/carousel.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  propertyCards = [
    [
      {
        currentIndex: 0,
        images: [
        './assets/images/houses/house1.jpg',
        './assets/images/houses/house2.jpg',
        './assets/images/houses/house3.jpg',
        './assets/images/houses/house4.jpg',
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
        './assets/images/houses/house1.jpg',
        './assets/images/houses/house2.jpg',
        './assets/images/houses/house3.jpg',
        './assets/images/houses/house4.jpg',
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
        './assets/images/houses/house1.jpg',
        './assets/images/houses/house2.jpg',
        './assets/images/houses/house3.jpg',
        './assets/images/houses/house4.jpg',
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
        './assets/images/houses/house1.jpg',
        './assets/images/houses/house2.jpg',
        './assets/images/houses/house3.jpg',
        './assets/images/houses/house4.jpg',
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
        './assets/images/houses/house1.jpg',
        './assets/images/houses/house2.jpg',
        './assets/images/houses/house3.jpg',
        './assets/images/houses/house4.jpg',
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
        './assets/images/houses/house1.jpg',
        './assets/images/houses/house2.jpg',
        './assets/images/houses/house3.jpg',
        './assets/images/houses/house4.jpg',
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
        './assets/images/houses/house1.jpg',
        './assets/images/houses/house2.jpg',
        './assets/images/houses/house3.jpg',
        './assets/images/houses/house4.jpg',
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
        './assets/images/houses/house1.jpg',
        './assets/images/houses/house2.jpg',
        './assets/images/houses/house3.jpg',
        './assets/images/houses/house4.jpg',
      ],
        propertyName: 'Another Property',
        propertyPrice: '$350,000',
        propertyAddress: '123 Main Street',
        propertyType: "For Sale",
      },
      
    ],
    
  ];

  // places demo
  places = [
        {
          image: "./assets/images/places/place1.jpg",
          title: "Mashonaland Central",
          desc: "This is a place demo"
        },
        {
          image: "./assets/images/places/place2.jpg",
          title: "Matabeleland South",
          desc: "This is a place demo"
        },
         {
          image: "./assets/images/places/place3.jpg",
          title: "Harare",
          desc: "This is a place demo"
        },
        {
          image: "./assets/images/places/place4.jpg",
          title: "Mashonaland East",
          desc: "This is a place demo"
        },
         {
          image: "./assets/images/places/place2.jpg",
          title: "Bulawayo",
          desc: "This is a place demo"
        },
        {
          image: "./assets/images/places/place3.jpg",
          title: "Midlands",
          desc: "This is a place demo"
        },

    ]; 


    // for articles
articles = [
    {
      image: "./assets/images/articles/article1.jpg",
      title: "How to Value your Property",
      date: "October 10, 2023",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
    },
    {
      image: "./assets/images/articles/article2.jpg",
      title: "Exploring How to Sell",
      date: "October 12, 2023",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
    },
    {
      image: "./assets/images/articles/article3.jpg",
      title: "Becoming a Top Seller",
      date: "October 15, 2023",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
    },
    {
      image: "./assets/images/articles/article4.jpg",
      title: "How to Value your Property",
      date: "October 18, 2023",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
    },
    {
      image: "./assets/images/articles/article5.jpg",
      title: "Exploring How to Sell",
      date: "October 21, 2023",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
    },
    {
      image: "./assets/images/articles/article3.jpg",
      title: "Becoming a Top Seller",
      date: "October 24, 2023",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
    },
    {
      image: "./assets/images/articles/article1.jpg",
      title: "Exploring How to Sell",
      date: "October 27, 2023",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
    },
    {
      image: "./assets/images/articles/article5.jpg",
      title: "Exploring How to Sell",
      date: "October 30, 2023",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
    },
    {
      image: "./assets/images/articles/article2.jpg",
      title: "Becoming a Top Seller",
      date: "November 2, 2023",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
    },
    {
      image: "./assets/images/articles/article1.jpg",
      title: "Becoming a Top Seller",
      date: "November 5, 2023",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
    },
];




  currentIndexArray: number[] = [];
  currentIndex: number = 0;
  autoplayInterval: number = 3000;

  slideConfig = {
  autoplay: true,
  dots: true,
  arrows: false
};



  constructor(private titleService: Title){}
  ngOnInit(){
    this.titleService.setTitle("Imalo | Home");
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
