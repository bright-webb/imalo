import { Component } from '@angular/core';

@Component({
  selector: 'app-sellers-guide',
  templateUrl: './sellers-guide.component.html',
  styleUrls: ['./sellers-guide.component.scss']
})
export class SellersGuideComponent {
 currentblog = {
    img: "./assets/images/articles/blog-item-one.jpg",
    date: '11 October 2022',
    title: 'How to Value your Property',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.'
  };

        
   blogs = [
    {
      img: "./assets/images/articles/article1.jpg",
      date: '11 October 2022',
      title: "Exploring How to Sell",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation."
    },
    {
      img: "./assets/images/articles/article2.jpg",
      date: '11 October 2022',
      title: "Becoming a Top Seller",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation."
    },
    {
      img: "./assets/images/articles/article3.jpg",
      date: '11 October 2022',
      title: "Exploring How to Sell",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation."
    },
  ];

}
