import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {ICategory} from '../../_models/ICategory';
import {BookService} from '../../_services/book.service';
import {IBook} from '../../_models/IBook';

@Component({
  // selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']

})
export class AdminPanelComponent implements OnInit {

  items: Observable<any[]>;

  constructor(private db: AngularFireDatabase, private _bookService: BookService) {
    this.items = db.list('items', ref => ref.orderByChild('categories/horror').equalTo(true)).valueChanges();
  }


  ngOnInit() {
    console.log(new Date('2017-03-10').toJSON());
  }

  addBooks() {
    const books: IBook[] = [
      {
        key: null,
        title: 'Angular 2. Tworzenie interaktywnych aplikacji internetowych',
        author: 'Gion Kunz',
        desc: 'Wykorzystywanie komponentów do budowy aplikacji internetowych jest uważane za wyjątkowo ważny krok naprzód w tej dziedzinie. Szczególnie ciekawym pomysłem jest tworzenie interfejsów użytkownika bazujących na komponentach. Framework Angular 2 zmienia technologię tworzenia aplikacji: ułatwia pisanie współdzielonych bloków kodu HTML, które można bez problemu wielokrotnie wykorzystywać dzięki zastosowaniu mechanizmu shadow DOM. Jest to bardzo obiecująca perspektywa, jednakże pod warunkiem, że programista potrafi efektywnie wykorzystać architekturę komponentową.',
        quantity: 10,
        price: 10,
        isbn: '987-83-283-3196-9',
        image: 'https://firebasestorage.googleapis.com/v0/b/e-commerce-pawel-idziak.appspot.com/o/books%2F-Kz08HZmgLRfNIz5y5sK.jpg?alt=media&token=4302292e-91db-460b-a9a6-4bb6f1775362',
        categories: {science: true},
        releaseDate: new Date('2017-03-10').toJSON()
      },
      {
        key: null,
        title: 'Język TypeScript. Tajniki kodu',
        author: 'Rozentals Nathan',
        desc: 'Język TypeScript, który wraz z kompilatorem i zestawem narzędzi jest udostępniany na zasadach open source, zyskuje ogromne uznanie tysięcy projektantów aplikacji. TypeScript pozwala na pracę w zgodzie ze standardami języka JavaScript (ES5, ES6 i ES7), co pozwala programistom na używanie klas, interfejsów, typów ogólnych itd. Okazuje się, że TypeScript umożliwia tworzenie solidnych aplikacji przy wykorzystaniu technik obiektowych — i są to nie tylko aplikacje WWW, lecz także aplikacje serwerowe, aplikacje dla urządzeń mobilnych, a nawet oprogramowanie do sterowania urządzeniami w internecie rzeczy (IoT).',
        quantity: 9,
        price: 9,
        isbn: '123-83-321-1111-9',
        image: 'https://firebasestorage.googleapis.com/v0/b/e-commerce-pawel-idziak.appspot.com/o/books%2F-Kz08HZpwsMzrepoIiga.jpg?alt=media&token=14eb188e-d221-467c-9bbb-8495ec4d00be',
        categories: {science: true},
        releaseDate: new Date('2017-11-24').toJSON()
      },
      {
        key: null,
        title: 'JavaScript. Zasady programowania obiektowego',
        author: 'Zakas Nicholas C.',
        desc: 'Programiści pracujący na co dzień z użyciem języków takich, jak Java, C# czy C++, z pewnym pobłażaniem patrzą na JavaScript. Traktują go jako język nie do końca obiektowy, w którym można napisać program działający bez tworzenia klas i obiektów. Są w błędzie! JavaScript to język o ogromnych możliwościach, pozwalający na obiektowe tworzenie programów. Nie wierzysz? Sięgnij po tę książkę i przekonaj się na własnej skórze!',
        quantity: 8,
        price: 8,
        isbn: '333-22-111-0123-9',
        image: 'https://firebasestorage.googleapis.com/v0/b/e-commerce-pawel-idziak.appspot.com/o/books%2F-Kz08HZpwsMzrepoIigb.jpg?alt=media&token=4b68b6cd-0b17-410c-aa36-cb4185301da0',
        categories: {science: true},
        releaseDate: new Date('2014-10-15').toJSON()
      },
      {
        key: null,
        title: 'Podręcznik startupu. Budowa wielkiej firmy krok po kroku',
        author: 'Blank Steve, Dorf Bob',
        desc: 'Ta książka nie jest lekturą do poduszki na jedną, bezsenną noc. Nie należy pochłaniać jej bezrefleksyjnie, by następnie odłożyć na półkę i już do niej nie wrócić. Wręcz przeciwnie - jeśli chcesz skorzystać z tego niezwykłego podręcznika, studiuj go po trochu, systematycznie i wracaj do niego regularnie. Niech stanie się twoim najlepszym przyjacielem na najbliższe sześć do trzydziestu miesięcy… ponieważ właśnie taki czas musisz dać sobie i swojemu przedsięwzięciu, by stało się rentowną firmą, zdolną do odniesienia rynkowego sukcesu.',
        quantity: 7,
        price: 7,
        isbn: '789-22-354-4523-9',
        image: 'https://firebasestorage.googleapis.com/v0/b/e-commerce-pawel-idziak.appspot.com/o/books%2F-Kz08HZq5KmDwsDb2Vid.jpg?alt=media&token=9a7cfd00-746e-4448-a1d8-18663e94882a',
        categories: {business: true},
        releaseDate: new Date('2013-06-14').toJSON()
      },
      {
        key: null,
        title: 'Biblia e-biznesu 2. Nowy Testament ',
        author: 'Opracowanie zbiorowe',
        desc: 'Poziom pewności siebie determinuje rozmiar celów, jakie sobie wyznaczasz, to, z jaką energią i determinacją koncentrujesz się na ich osiąganiu oraz jak bardzo będziesz wytrwały w pokonywaniu przeszkód. Z tej wartościowej, praktycznej książki, opartej na pracy z ponad 5 milionami menedżerów, przedsiębiorców, handlowców i ambitnych ludzi z ponad sześćdziesięciu krajów, dowiesz się, jak rozwinąć w sobie niewzruszoną pewność siebie w każdym obszarze życia.',
        quantity: 6,
        price: 6,
        isbn: '678-12-785-3457-5',
        image: 'https://firebasestorage.googleapis.com/v0/b/e-commerce-pawel-idziak.appspot.com/o/books%2F-Kz08HZraonbiBwKcwvp.jpg?alt=media&token=729f7fc1-cbe7-43c0-a1ee-62bb036341b3',
        categories: {business: true},
        releaseDate: new Date('2016-09-16').toJSON()
      },
      {
        key: null,
        title: 'Jak napisać biznesplan gwarantujący sukces ',
        author: 'Sutton Garrett, Kiyosaki Robert',
        desc: 'Skuteczne biznesplany precyzują najważniejsze kwestie dotyczące przygotowanego przez ciebie biznesu – zawierają odpowiedzi na pytania rozpoczynające się od słów: kto, co, kiedy, dlaczego i gdzie. \n Czytając tę książkę, zostaniesz przeprowadzony przez cały proces tworzenia skutecznego biznesplanu, począwszy od wizji twojego biznesu, a skończywszy na biznesplanie, który zagwarantuje ci sukces.',
        quantity: 5,
        price: 5,
        isbn: '786-45-123-3214-2',
        image: 'https://firebasestorage.googleapis.com/v0/b/e-commerce-pawel-idziak.appspot.com/o/books%2F-Kz08HZraonbiBwKcwvq.jpg?alt=media&token=c7851727-c648-4fe3-ab03-16dcdd36d5d0',
        categories: {business: true},
        releaseDate: new Date('2014-12-03').toJSON()
      }
  ];

    for (const book of books) {
      this.db.list('books').push(book);
    }
  }

  addCategories() {
    const categories: ICategory[] = [
      {name: 'science'},
      {name: 'business'}
    ];

    for (const category of categories) {
      this.db.list('categories').push(category);
    }
  }

}
