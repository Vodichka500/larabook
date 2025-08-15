<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Apartment;
use App\Models\Book;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Tworzymy użytkowników
        $user1 = User::factory()->create([
            'name' => 'Marek2004',
            'email' => 'marek.kowalski@example.com',
            'password' => bcrypt('password'),
            'phone_number' => '+48 123 456 789',
            'first_name' => 'Marek',
            'last_name' => 'Kowalski',
        ]);

        $user2 = User::factory()->create([
            'name' => 'Nowak19',
            'email' => 'anna.nowak@example.com',
            'password' => bcrypt('password'),
            'phone_number' => '+48 234 567 890',
            'first_name' => 'Anna',
            'last_name' => 'Nowak',
        ]);

        $user3 = User::factory()->create([
            'name' => 'Krzyswis',
            'email' => 'krzysztof.wisniewski@example.com',
            'password' => bcrypt('password'),
            'phone_number' => '+48 345 678 901',
            'first_name' => 'Krzysztof',
            'last_name' => 'Wiśniewski',
        ]);

        $user4 = User::factory()->create([
            'name' => 'Ewa1823',
            'email' => 'ewa.zielinska@example.com',
            'password' => bcrypt('password'),
            'phone_number' => '+48 456 789 012',
            'first_name' => 'Ewa',
            'last_name' => 'Zielińska',
        ]);

        // Tworzymy apartamenty
        $apartment1 = Apartment::create([
            'user_id' => $user1->id,
            'title' => 'Dom w górach z widokiem na szczyty',
            'description' => 'Zapraszamy do przytulnego domku położonego w samym sercu gór, gdzie śnieg pokrywa wszystko jak magiczna kołdra. Ciesz się widokiem na majestatyczne szczyty i bliskością natury. W pobliżu znajdziesz liczne szlaki turystyczne, idealne na zimowe wędrówki, oraz stoki narciarskie dostosowane do różnych poziomów zaawansowania. Po dniu pełnym aktywności możesz odpocząć przy kominku, delektując się gorącą herbatą.',
            'country' => 'Niemcy',
            'rating' => 4.5,
            'place_description' => 'Domek składa się z dwóch sypialni – jedna z podwójnym łóżkiem, druga z dwoma pojedynczymi łóżkami. Przestronny salon połączony z w pełni wyposażoną kuchnią pozwala spędzać czas w rodzinnym gronie. W łazience znajduje się prysznic oraz pralka. Na zewnątrz znajdziesz taras z widokiem na góry oraz miejsce na ognisko.',
            'important_information' => 'Goście otrzymują kod do wejścia. Zapewniamy miejsce parkingowe oraz drewno do kominka.',
            'apartment_type' => 'Dom',
            'max_guests' => 2,
            'bedrooms_quantity' => 1,
            'bathrooms_quantity' => 1,
            'beds_quantity' => 1,
            'price' => 100.00,
            'rules' => 'Brak zwierząt, zakaz palenia.',
            'booked_dates' => json_encode(['2025-02-01', '2025-02-08']),
            'images' => json_encode([
                '/images/apartment1_img1.avif',
                '/images/apartment1_img2.avif',
                '/images/apartment1_img3.avif',
                '/images/apartment1_img4.avif',
                '/images/apartment1_img5.avif'
            ]),
        ]);

        $apartment2 = Apartment::create([
            'user_id' => $user2->id,
            'title' => 'Dom w lesie z jacuzzi na zewnątrz',
            'description' => 'Nowoczesny dom w środku zimowego lasu to idealne miejsce na relaks z dala od zgiełku miasta. Otoczony ośnieżonymi drzewami, oferuje spokojną atmosferę oraz możliwość obcowania z naturą. W okolicy znajdziesz trasy narciarskie, miejsca do spacerów wśród drzew oraz jeziora zamarznięte zimą – idealne na łyżwy.',
            'country' => 'Niemcy',
            'rating' => 4.8,
            'place_description' => 'Dom składa się z trzech sypialni – dwie z podwójnymi łóżkami, jedna z łóżkiem piętrowym, idealnym dla dzieci. Przestronny salon z dużymi oknami zapewnia widok na las, a kominek dodaje ciepła. W pełni wyposażona kuchnia umożliwia przygotowanie posiłków, a nowoczesna łazienka oferuje zarówno wannę, jak i prysznic. Na zewnątrz znajduje się jacuzzi, które jest dostępne przez cały rok.',
            'important_information' => 'Goście otrzymują kod do wejścia. Przy domu znajduje się prywatny parking na dwa samochody.',
            'apartment_type' => 'Dom',
            'max_guests' => 3,
            'bedrooms_quantity' => 1,
            'bathrooms_quantity' => 1,
            'beds_quantity' => 2,
            'price' => 150.00,
            'rules' => 'Zwierzęta dozwolone, brak imprez.',
            'booked_dates' => json_encode(['2025-04-26', '2025-05-01']),
            'images' => json_encode([
                '/images/apartment2_img1.avif',
                '/images/apartment2_img2.avif',
                '/images/apartment2_img3.avif',
                '/images/apartment2_img4.avif',
                '/images/apartment2_img5.avif',
            ]),
        ]);

        $apartment3 = Apartment::create([
            'user_id' => $user3->id,
            'title' => 'Apartamenty w samym sercu miasta',
            'description' => 'Przestronne i nowoczesne apartamenty w samym sercu miasta to doskonałe miejsce na pobyt zarówno dla par, jak i rodzin. W pobliżu znajdziesz restauracje, kawiarnie, galerie sztuki oraz najważniejsze atrakcje turystyczne. Doskonała lokalizacja pozwala na wygodne zwiedzanie pieszo..',
            'country' => 'Polska',
            'rating' => 4.9,
            'place_description' => 'Apartamenty składają się z dwóch sypialni – jedna z podwójnym łóżkiem, druga z dwoma pojedynczymi łóżkami. Przestronny salon połączony z kuchnią w stylu open space posiada sofę, która może służyć jako dodatkowe miejsce do spania. W łazience znajduje się pralka, suszarka i prysznic. Do dyspozycji gości jest także balkon z widokiem na centrum miasta.',
            'important_information' => 'Zapewniamy szybkie Wi-Fi, parking w garażu podziemnym oraz całodobowy dostęp do apartamentu dzięki systemowi kodów.',
            'apartment_type' => 'Apartment',
            'max_guests' => 4,
            'bedrooms_quantity' => 2,
            'bathrooms_quantity' => 1,
            'beds_quantity' => 3,
            'price' => 120.00,
            'rules' => 'Brak imprez, cisza nocna po 22:00.',
            'booked_dates' => json_encode(['2025-09-16', '2025-09-21']),
            'images' => json_encode([
                '/images/apartment3_img1.avif',
                '/images/apartment3_img2.avif',
                '/images/apartment3_img3.avif',
                '/images/apartment3_img4.avif',
                '/images/apartment3_img5.avif',
            ]),
        ]);

        // Tworzymy rezerwacje
        Book::create([
            'customer_id' => $user4->id,
            'apartment_id' => $apartment1->id,
            'start_date' => '2025-02-01',
            'end_date' => '2025-02-08',
            'guests_quantity' => 2,
        ]);

        Book::create([
            'customer_id' => $user2->id,
            'apartment_id' => $apartment2->id,
            'start_date' => '2025-04-26',
            'end_date' => '2025-05-01',
            'guests_quantity' => 1,

        ]);

        Book::create([
            'customer_id' => $user1->id,
            'apartment_id' => $apartment3->id,
            'start_date' => '2025-09-16',
            'end_date' => '2025-09-21',
            'guests_quantity' => 2,
        ]);

        // Tworzymy polubienia
        $user1->likedApartments()->attach($apartment1->id);
        $user2->likedApartments()->attach($apartment2->id);
        $user3->likedApartments()->attach($apartment3->id);
    }
}
