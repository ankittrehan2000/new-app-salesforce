import { LightningElement, track } from 'lwc';
import retrieveNews from "@salesforce/apex/newsController.retrieveNews";

export default class NewsPage extends LightningElement {
  @track result = []
  connectedCallback() {
    this.fetchNews();
  }

  fetchNews() {
    retrieveNews().then((response) => 
    this.formatNewsData(response)).catch(err => console.error(err));
  }

  formatNewsData(res) {
    console.log(res)
    this.result = res.map((item, index) => {
      let id = `new_${index}`;
      let date = new Date(item.publishedAt).toDateString();
      let name = item.source.name;
      return { ...item, name, id, date }
    })
  }
}
