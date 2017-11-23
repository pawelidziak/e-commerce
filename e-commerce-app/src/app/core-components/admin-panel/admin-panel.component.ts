import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {ICategory} from '../../_models/ICategory';
import {BookService} from '../../_services/book.service';
import {IBook} from '../../_models/IBook';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import * as firebase from 'firebase/app';
import 'firebase/storage';

@Component({
  // selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']

})
export class AdminPanelComponent implements OnInit {

  addBookForm: FormGroup;
  title = new FormControl('', Validators.required);
  desc = new FormControl('', Validators.required);
  author = new FormControl('', Validators.required);
  isbn = new FormControl('', Validators.required);
  price = new FormControl('', Validators.required);
  quantity = new FormControl('', Validators.required);
  image: string;
  releaseDate = new FormControl('', Validators.required);

  selectedCategory: ICategory;
  categoriesToSelect: Array<ICategory> = null;

  constructor(private db: AngularFireDatabase, private _bookService: BookService, private _formBuilder: FormBuilder) {
    this.db.list('categories').valueChanges().subscribe(
      (category: ICategory[]) => {
        this.categoriesToSelect = category;
        this.selectedCategory = this.categoriesToSelect[0];
      },
      (error) => console.log(error)
    );
  }

  // onChangeFile(event) {
  //   this.image = event.srcElement.files;
  //   console.log(this.image);
  // }
  //
  // addBook() {
  //   if (this.addBookForm.valid) {
  //     const book: IBook = {
  //       title: this.title.value,
  //       desc: this.desc.value,
  //       author: this.author.value,
  //       isbn: this.isbn.value,
  //       price: this.price.value,
  //       quantity: this.quantity.value,
  //       image: '',
  //       categories: this.selectedCategory,
  //       releaseDate: this.releaseDate.value
  //     };
  //
  //     console.log(book);
  //     const key = this.db.list('books').push(book).key;
  //
  //     console.log(key);
  //
  //     const storageRef = firebase.storage().ref('books/' + key);
  //     const task = storageRef.put(this.image);
  //     task.on('state_changed',
  //       (snapshot) => {
  //         console.log('Uploading...');
  //       },
  //       (error) => {
  //         console.log(error);
  //       },
  //       _ => {
  //         console.log('Image uploaded.');
  //       });
  //   }
  // }


  ngOnInit() {
    this.addBookForm = this._formBuilder.group({
      title: this.title,
      desc: this.desc,
      author: this.author,
      isbn: this.isbn,
      price: this.price,
      quantity: this.quantity,
      image: this.image,
      releaseDate: this.releaseDate
    });
  }

  addBooks() {
    const books: IBook[] = [
      {
        title: 'Angular 2. Tworzenie interaktywnych aplikacji internetowych',
        author: 'Gion Kunz',
        desc: 'Wykorzystywanie komponentów do budowy aplikacji internetowych jest uważane za wyjątkowo ważny krok naprzód w tej dziedzinie. Szczególnie ciekawym pomysłem jest tworzenie interfejsów użytkownika bazujących na komponentach. Framework Angular 2 zmienia technologię tworzenia aplikacji: ułatwia pisanie współdzielonych bloków kodu HTML, które można bez problemu wielokrotnie wykorzystywać dzięki zastosowaniu mechanizmu shadow DOM. Jest to bardzo obiecująca perspektywa, jednakże pod warunkiem, że programista potrafi efektywnie wykorzystać architekturę komponentową.',
        quantity: 10,
        price: 10,
        isbn: '987-83-283-3196-9',
        image: 'https://firebasestorage.googleapis.com/v0/b/e-commerce-pawel-idziak.appspot.com/o/books%2Fangular2.jpg?alt=media&token=a86417d7-35c7-4523-9ec1-e6c275ce7a5f',
        categories: {science: true},
        releaseDate: new Date('2017-03-10').toJSON()
      },
      {
        title: 'Język TypeScript. Tajniki kodu',
        author: 'Rozentals Nathan',
        desc: 'Język TypeScript, który wraz z kompilatorem i zestawem narzędzi jest udostępniany na zasadach open source, zyskuje ogromne uznanie tysięcy projektantów aplikacji. TypeScript pozwala na pracę w zgodzie ze standardami języka JavaScript (ES5, ES6 i ES7), co pozwala programistom na używanie klas, interfejsów, typów ogólnych itd. Okazuje się, że TypeScript umożliwia tworzenie solidnych aplikacji przy wykorzystaniu technik obiektowych — i są to nie tylko aplikacje WWW, lecz także aplikacje serwerowe, aplikacje dla urządzeń mobilnych, a nawet oprogramowanie do sterowania urządzeniami w internecie rzeczy (IoT).',
        quantity: 9,
        price: 9,
        isbn: '123-83-321-1111-9',
        image: 'https://firebasestorage.googleapis.com/v0/b/e-commerce-pawel-idziak.appspot.com/o/books%2Fts.jpg?alt=media&token=55bee49d-61cf-4242-ab73-1c3d153ce111',
        categories: {science: true},
        releaseDate: new Date('2017-11-24').toJSON()
      },
      {
        title: 'JavaScript. Zasady programowania obiektowego',
        author: 'Zakas Nicholas C.',
        desc: 'Programiści pracujący na co dzień z użyciem języków takich, jak Java, C# czy C++, z pewnym pobłażaniem patrzą na JavaScript. Traktują go jako język nie do końca obiektowy, w którym można napisać program działający bez tworzenia klas i obiektów. Są w błędzie! JavaScript to język o ogromnych możliwościach, pozwalający na obiektowe tworzenie programów. Nie wierzysz? Sięgnij po tę książkę i przekonaj się na własnej skórze!',
        quantity: 8,
        price: 8,
        isbn: '333-22-111-0123-9',
        image: 'https://firebasestorage.googleapis.com/v0/b/e-commerce-pawel-idziak.appspot.com/o/books%2Fjs.jpg?alt=media&token=65aa98c6-138c-4b2c-a13f-1c4b646f21f7',
        categories: {science: true},
        releaseDate: new Date('2014-10-15').toJSON()
      },
      {
        title: 'Podręcznik startupu. Budowa wielkiej firmy krok po kroku',
        author: 'Blank Steve, Dorf Bob',
        desc: 'Ta książka nie jest lekturą do poduszki na jedną, bezsenną noc. Nie należy pochłaniać jej bezrefleksyjnie, by następnie odłożyć na półkę i już do niej nie wrócić. Wręcz przeciwnie - jeśli chcesz skorzystać z tego niezwykłego podręcznika, studiuj go po trochu, systematycznie i wracaj do niego regularnie. Niech stanie się twoim najlepszym przyjacielem na najbliższe sześć do trzydziestu miesięcy… ponieważ właśnie taki czas musisz dać sobie i swojemu przedsięwzięciu, by stało się rentowną firmą, zdolną do odniesienia rynkowego sukcesu.',
        quantity: 7,
        price: 7,
        isbn: '789-22-354-4523-9',
        image: 'https://firebasestorage.googleapis.com/v0/b/e-commerce-pawel-idziak.appspot.com/o/books%2Fstartup.jpg?alt=media&token=46318b4d-2a5f-4f96-bf96-3092aa767491',
        categories: {business: true},
        releaseDate: new Date('2013-06-14').toJSON()
      },
      {
        title: 'Biblia e-biznesu 2. Nowy Testament',
        author: 'Opracowanie zbiorowe',
        desc: 'Poziom pewności siebie determinuje rozmiar celów, jakie sobie wyznaczasz, to, z jaką energią i determinacją koncentrujesz się na ich osiąganiu oraz jak bardzo będziesz wytrwały w pokonywaniu przeszkód. Z tej wartościowej, praktycznej książki, opartej na pracy z ponad 5 milionami menedżerów, przedsiębiorców, handlowców i ambitnych ludzi z ponad sześćdziesięciu krajów, dowiesz się, jak rozwinąć w sobie niewzruszoną pewność siebie w każdym obszarze życia.',
        quantity: 6,
        price: 6,
        isbn: '678-12-785-3457-5',
        image: 'https://firebasestorage.googleapis.com/v0/b/e-commerce-pawel-idziak.appspot.com/o/books%2Fe-biznes.jpg?alt=media&token=c24dfbcc-6e09-4232-83d3-19c2819d2813',
        categories: {business: true},
        releaseDate: new Date('2016-09-16').toJSON()
      },
      {
        title: 'Jak napisać biznesplan gwarantujący sukces',
        author: 'Sutton Garrett, Kiyosaki Robert',
        desc: 'Skuteczne biznesplany precyzują najważniejsze kwestie dotyczące przygotowanego przez ciebie biznesu – zawierają odpowiedzi na pytania rozpoczynające się od słów: kto, co, kiedy, dlaczego i gdzie. \n Czytając tę książkę, zostaniesz przeprowadzony przez cały proces tworzenia skutecznego biznesplanu, począwszy od wizji twojego biznesu, a skończywszy na biznesplanie, który zagwarantuje ci sukces.',
        quantity: 5,
        price: 5,
        isbn: '786-45-123-3214-2',
        image: 'https://firebasestorage.googleapis.com/v0/b/e-commerce-pawel-idziak.appspot.com/o/books%2Fbiznesplan.jpg?alt=media&token=cf52bf59-728b-499d-b52b-e6827d89f5cc',
        categories: {business: true},
        releaseDate: new Date('2014-12-03').toJSON()
      },
      {
        title: 'E-commerce. Strategia, zarządzanie, finanse',
        author: 'Justyna Skorupińska',
        desc: 'Książka jest pierwszą na rynku publikacją z zakresu e-commerce uwzględniającą polską specyfikę. Obejmuje zarówno aspekty strategiczne, jak i finansowe handlu w internecie oraz zawiera pełen proces: od strategii e-biznesu aż po budowanie business case i zarządzanie kanałem e-commerce. Jest wzbogacona o studia przypadków z polskiego rynku oraz o praktyczne narzędzia zarządcze.\n' +
        'Została napisana z myślą o praktykach związanych z branżą handlu internetowego. Jest również cennym źródłem wiedzy dla studentów kierunków ekonomii, zarządzania, marketingu i handlu elektronicznego.\n' +
        'Świetne kompendium wiedzy na temat handlu elektronicznego, w którym autorka zawarła podstawowe pojęcia i definicje dotyczące tego rynku, zarówno w wymiarze makro-, jak i mikrootoczenia. Wskazuje, w jaki sposób rozwija się e-commerce i jakie są główne determinanty tego wzrostu. Istotnym elementem poradnika są zasady budowania strategii dla e-handlu w kontekście modelowania tego biznesu, budowania unikatowych wartości dla klienta oraz stawiania celów i zwrotu z inwestycji w podejmowane działania.\n' +
        'Ważnym elementem książki jest charakterystyka specyfiki klienta online oraz budowanie efektywnych i korzystnych doświadczeń nie tylko w kontekście samej architektury sklepu, ale szeroko rozumianych taktyk i narzędzi e-marketingowych w ramach całego procesu zakupowego i punktów styku sklepu internetowego z klientem.',
        quantity: 5,
        price: 11,
        isbn: '354-45-888-4321-2',
        image: 'https://firebasestorage.googleapis.com/v0/b/e-commerce-pawel-idziak.appspot.com/o/books%2Fe-commerce.jpg?alt=media&token=412ed418-4322-46d2-8b21-8a2acdab0134',
        categories: {business: true},
        releaseDate: new Date('2017-10-12').toJSON()
      },
      {
        title: 'Prawo handlu elektronicznego',
        author: 'Mariusz Chudzik, Aneta Frań, Agnieszka Grzywacz, Krzysztof Korus, Marcin Spyra',
        desc: 'Książka stanowi kompendium zagadnień prawnych pojawiających się w obrocie elektronicznym. Omówiono w niej skuteczność oświadczeń w postaci elektronicznej, a szczególny nacisk położono na podstawową jej przesłankę, czyli identyfikację podmiotó prawa występujących w obrocie elektronicznym.',
        quantity: 5,
        price: 11,
        isbn: '123-11-222-4321-2',
        image: 'https://firebasestorage.googleapis.com/v0/b/e-commerce-pawel-idziak.appspot.com/o/books%2Fi-prawo-handlu-elektronicznego.jpg?alt=media&token=37b0725f-0657-4161-8ddd-a9ab3e47d826',
        categories: {business: true},
        releaseDate: new Date('2005-10-10').toJSON()
      },
      {
        title: 'NoSQL. Przyjazny przewodnik',
        author: 'Dan Sullivan',
        desc: 'Systemy do zarządzania danymi muszą dziś spełniać o wiele wyższe wymagania niż kiedyś. W wielu przypadkach nierelacyjne bazy danych, zwane NoSQL, są lepszym rozwiązaniem niż dominujące do niedawna bazy relacyjne. Projektant systemu ma więc do dyspozycji dobrze znane bazy relacyjne oraz systemy NoSQL, takie jak bazy klucz–wartość, bazy dokumentów, rodziny kolumn i bazy grafowe. Do rozstrzygnięcia pozostaje problem: którą technologię zarządzania danymi wybrać w danym przypadku.Niniejsza książka jest przystępnym, pragmatycznym przewodnikiem po nierelacyjnych systemach bazodanowych. Pokazano w niej, czym różnią się NoSQL od baz relacyjnych. Szczególny nacisk położono na wyjaśnienie tych cech i funkcjonalności, które powinny być uwzględniane podczas projektowania aplikacji i wybierania technologii bazodanowych. Przedstawiono wewnętrzne mechanizmy baz NoSQL i wyjaśniono, w jaki sposób da się zbudować za ich pomocą skalowalne, niezawodne aplikacje. Nie zabrakło przydatnych wskazówek, zasad projektowych i najlepszych praktyk.',
        quantity: 15,
        price: 6,
        isbn: '354-00-456-0000-2',
        image: 'https://firebasestorage.googleapis.com/v0/b/e-commerce-pawel-idziak.appspot.com/o/books%2Fnosql.jpg?alt=media&token=3e7bd7e7-ae4a-4762-96b6-316c49e6951f',
        categories: {science: true},
        releaseDate: new Date('2016-08-07').toJSON()
      },
      {
        title: 'Czysty kod. Podręcznik dobrego programisty',
        author: 'Robert C. Martin',
        desc: 'O tym, ile problemów sprawia niedbale napisany kod, wie każdy programista. Nie wszyscy jednak wiedzą, jak napisać ten świetny, „czysty” kod i czym właściwie powinien się on charakteryzować. Co więcej – jak odróżnić dobry kod od złego? Odpowiedź na te pytania oraz sposoby tworzenia czystego, czytelnego kodu znajdziesz właśnie w tej książce. Podręcznik jest obowiązkową pozycją dla każdego, kto chce poznać techniki rzetelnego i efektywnego programowania.\n' +
        '\n' + 'W książce „Czysty kod. Podręcznik dobrego programisty” szczegółowo omówione zostały zasady, wzorce i najlepsze praktyki pisania czystego kodu. Podręcznik zawiera także kilka analiz przypadków o coraz większej złożoności, z których każda jest doskonałym ćwiczeniem porządkowania zanieczyszczonego bądź nieudanego kodu. Z tego podręcznika dowiesz się m.in., jak tworzyć dobre nazwy, obiekty i funkcje, a także jak tworzyć testy jednostkowe i korzystać z programowania sterowanego testami. Nauczysz się przekształcać kod zawierający problemy w taki, który jest solidny i efektywny.',
        quantity: 20,
        price: 10,
        isbn: '123-00-7888-000-2',
        image: 'https://firebasestorage.googleapis.com/v0/b/e-commerce-pawel-idziak.appspot.com/o/books%2Fczystykod.jpg?alt=media&token=aa21ccac-dcb6-482b-af36-79e29e7b3a5b',
        categories: {science: true},
        releaseDate: new Date('2015-03-25').toJSON()
      },
      {
        title: 'Rusz głową! Programowanie w JavaScript',
        author: 'Freeman Eric T., Robson Elisabeth',
        desc: 'Naucz się jak używać języka JavaScript do prowadzenia interakcji ze stronami WWW. Rozwiń swoje umiejętności poza pisanie prostych skryptów — poznaj programowanie obiektowe.\nBuduj prawdzie, interaktywne aplikacje internetowe.\nZobacz jak rozwiązywać realne problem, aby poznać najlepsze sposoby pisania kodu.\nSpróbuj rozwikłać ponad 120 zagadek i ćwiczeń.\nJeżeli chcesz stworzyć atrakcyjną aplikację internetową lub stronę WWW, to poza znajomością języka HTML powinieneś również umieć korzystać z JavaScriptu. Język ten jeszcze całkiem niedawno wzbudzał wiele negatywnych emocji — ale te czasy odeszły w niepamięć! Bez jego pomocy współczesne strony WWW nie byłyby takie funkcjonalne!',
        quantity: 15,
        price: 4,
        isbn: '231-10-7888-000-2',
        image: 'https://firebasestorage.googleapis.com/v0/b/e-commerce-pawel-idziak.appspot.com/o/books%2Fjs2.jpg?alt=media&token=7e324edb-34e0-486e-8a16-79454f007e35',
        categories: {science: true},
        releaseDate: new Date('2015-02-16').toJSON()
      },
      {
        title: 'Rusz głową! Wzorce projektowe',
        author: 'Freeman Elisabeth, Freeman Eric, Bates Beret',
        desc: 'Otwórz swój umysł. Poznaj wszystko, co związane z wzorcami projektowymi, w sposób gwarantujący szybkie i skuteczne opanowanie zasad ich stosowania. Zapomnij o listingach liczących tysiące wierszy, długich i nużących opisach teoretycznych oraz rozbudowanych schematach zależności. Wzorce projektowe to gotowe opisy rozwiązań najczęstszych problemów napotykanych przy tworzeniu oprogramowania. Aby je prawidłowo stosować, należy poznać założenia, na podstawie których zostały stworzone, oraz nauczyć się implementować je we właściwy sposób.\n' +
        '\nNaprzód, głowo!\n\n' + 'Nikt ci tego nie potrafił wytłumaczyć? Wydaje Ci się, że to problem nie na Twoją głowę? Nie potrzebujesz elektrowstrząsów, żeby pobudzić swój mózg do aktywnego działania. Tylko żadnych gwałtownych gestów! Usiądź wygodnie, otwórz książkę, dopiero teraz się zacznie. Na początek - rusz głową!',
        quantity: 25,
        price: 4,
        isbn: '777-10-7654-555-2',
        image: 'https://firebasestorage.googleapis.com/v0/b/e-commerce-pawel-idziak.appspot.com/o/books%2Fwzorce.jpg?alt=media&token=9742d1f7-3245-4392-aab5-1d752f567fd6',
        categories: {science: true},
        releaseDate: new Date('2010-11-23').toJSON()
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
