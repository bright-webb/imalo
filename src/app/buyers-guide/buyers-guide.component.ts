import { Component } from '@angular/core';

@Component({
  selector: 'app-buyers-guide',
  templateUrl: './buyers-guide.component.html',
  styleUrls: ['./buyers-guide.component.scss']
})
export class BuyersGuideComponent {
   currentblog = {
  img: "./assets/images/articles/blog-item-one.jpg",
  date: '11 October 2022',
  title: 'Exploring the World of Machine Learning',
  description: 'Dive into the captivating realm of machine learning, where algorithms and data converge to enable intelligent systems. Explore the groundbreaking applications that are reshaping industries, from healthcare to finance, and uncover the limitless possibilities of this transformative technology.'
};

      
 blogs = [
  {
    img: "./assets/images/articles/article1.jpg",
    date: '11 October 2022',
    title: "Exploring the World of Machine Learning",
    description: "Discover the fascinating world of machine learning and its impact on various industries."
  },
  {
    img: "./assets/images/articles/article2.jpg",
    date: '11 October 2022',
    title: "Healthy Eating Habits for a Balanced Lifestyle",
    description: "Learn about the importance of maintaining healthy eating habits and tips for a balanced lifestyle."
  },
  {
    img: "./assets/images/articles/article3.jpg",
    date: '11 October 2022',
    title: "Traveling on a Budget: Tips and Tricks",
    description: "Explore budget-friendly travel options and tricks to make your next adventure affordable."
  },
];

}
