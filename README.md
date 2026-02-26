# E-commerce Orders — Revenue Drivers

## Opis projektu

Celem zadania było przeanalizowanie danych z platformy e-commerce oraz przedstawienie wybranych informacji w czytelnej, sensownej formie wizualnej.

Dane zawierają informacje o zamówieniach, m.in. kategorię produktu, cenę jednostkową, ilość, lokalizację (kraj, miasto, współrzędne), typ klienta, metodę płatności, urządzenie oraz czas dostawy.

Zdecydowałem się skupić na analizie przychodów (revenue) jako głównej metryce biznesowej, ponieważ w kontekście platformy e-commerce jest to najbardziej podstawowy i uniwersalny wskaźnik efektywności sprzedaży.

Revenue zostało obliczone jako:

    revenue = quantity × unitPrice

---

## Zakres analizy i selekcja danych

Z dostępnych pól wybrałem trzy perspektywy analizy:

1. Segment produktowy (category)
2. Segment klienta (new vs returning)
3. Koncentracja geograficzna (city)

Świadomie nie uwzględniałem wszystkich dostępnych metadanych (device, paymentMethod, deliveryDays, timestamp), ponieważ celem było pokazanie selekcji kluczowych informacji, a nie prezentacja wszystkich możliwych przekrojów danych.

---

## Wykresy

### 1. Revenue by category (bar chart)

Agregacja:

    SUM(quantity × unitPrice) by category

Cel:

- identyfikacja segmentów produktowych generujących największy przychód,
- szybkie porównanie wartości między kategoriami,
- ranking przychodów.

Wykres słupkowy poziomy został wybrany ze względu na czytelność oraz możliwość łatwego porównania wartości.

---

### 2. Customer value: New vs Returning (column + spline)

Agregacja:

- Revenue per customerType
- Average Order Value (AOV) per customerType

AOV:

    AOV = totalRevenue / numberOfOrders

Cel:

- porównanie całkowitego wkładu segmentów klientów w przychód,
- analiza różnic w średniej wartości zamówienia.

Zastosowałem wykres kolumnowy dla revenue oraz liniowy (secondary axis) dla AOV, aby pokazać zarówno skalę przychodu, jak i jakość koszyka zakupowego.

---

### 3. Geographic concentration (bubble chart)

Agregacja:

    SUM(revenue) by city

Cel:

- identyfikacja miast generujących najwyższy przychód,
- wizualne pokazanie koncentracji sprzedaży.

Rozmiar bąbla reprezentuje wartość przychodu. Współrzędne lat/lon zostały wykorzystane bez dodatkowej mapy, co pozwala zachować prostotę rozwiązania przy jednoczesnym pokazaniu przestrzennego rozkładu sprzedaży.

---

## Decyzje projektowe

- Skupiłem się na jednej głównej metryce (revenue), aby uniknąć nadmiaru wskaźników.
- Zastosowałem maksymalnie trzy wykresy zgodnie z wymaganiami.
- Unikałem nadmiarowych wizualizacji i dodatkowych filtrów, aby zachować prostotę.
- Projekt został przygotowany wyłącznie w wersji desktopowej.
- Interfejs jest minimalistyczny, z naciskiem na czytelność i hierarchię informacji.

---

## Technologia

Projekt został zrealizowany przy użyciu:

- React
- TypeScript
- Vite
- Highcharts

Highcharts został wybrany ze względu na dobrą kontrolę nad konfiguracją, obsługę wykresów typu bubble oraz łatwe zarządzanie osiami i tooltipami.

---

## Uruchomienie projektu

### Wymagania

- Node.js
- npm

### Instalacja i uruchomienie

1. Sklonuj repozytorium:

   git clone <adres_repozytorium>
   cd <nazwa_folderu>

2. Zainstaluj zależności:

   npm install

3. Uruchom serwer developerski:

   npm run dev

4. Otwórz przeglądarkę i przejdź pod adres:

   http://localhost:5173

---

## Podsumowanie

Projekt koncentruje się na selekcji kluczowych informacji i przedstawieniu ich w czytelnej formie wizualnej. Zamiast prezentować wszystkie możliwe wymiary danych, wybrałem trzy perspektywy, które pozwalają szybko zrozumieć główne czynniki wpływające na przychód:

- które kategorie napędzają sprzedaż,
- jaka jest wartość segmentów klientów,
- gdzie koncentruje się sprzedaż geograficznie.

Celem było pokazanie sposobu myślenia analitycznego, a nie maksymalnej liczby wykresów.





# Zadanie rekrutacyjne — Data Visualization (Frontend)

## Kontekst

Dane w pliku `data.json` pochodzą z platformy **e-commerce** i zawierają informacje o zamówieniach, m.in.:

- czas,
- lokalizację (kraj, miasto, dane geograficzne),
- kategorie produktów,
- ilości,
- ceny,
- dodatkowe metadane (płatność, typ klienta, urządzenie, czas dostawy).

Twoim celem jest **zrozumienie danych**, wybranie **niektórych informacji** i przedstawienie ich w **czytelnej, sensownej formie wizualnej** (dataviz).

## Zadanie

Przeanalizuj dane i:

- zdecyduj, które pola są dla Ciebie istotne,
- agreguj dane w sposób, który uznasz za sensowny,

Przygotuj **maksymalnie 3** wykresy.

- samodzielnie zdecyduj, **jakie wizualizacje** przygotujesz (na podstawie wybranych przez Ciebie danych),
- nie narzucamy konkretnych metryk ani podziałów,
- zależy nam na **selekcji najistotniejszych dla Ciebie informacji**, nie na pokazaniu wszystkiego.

## Opis rozwiązania

W pliku README dodaj opis, w którym wyjaśnisz:

- jakie dane uznałeś/aś za kluczowe,
- dlaczego wybrałeś/aś właśnie takie wizualizacje (typy wykresów).

## Technologia i uruchomienie

- interesuje nas **wyłącznie wersja desktopowa** (brak wymagań dot. mobile, nie dokładaj sobie niepotrzebnej pracy),
- **nie narzucamy tech stacku** (technologia nie jest kryterium oceny):
- framework: dowolny lub brak,
- biblioteki: także dowolne. W naszej firmie skupiamy się głównie na Highcharts, ale nie wymagamy znajomości akurat tej biblioteki, więc jeśli chcesz użyć innej prostszej - gorąco do tego zachęcamy.

## Uruchomienie projektu

W pliku README opisz także wymagania (np. Node, Python, serwer lokalny) i kroki przydatne dla nas do uruchomienia Twojego projektu.
Projekt powinien być **łatwy do uruchomienia lokalnie** bez dodatkowych wyjaśnień.

## Czas

Nie oczekujemy kompletnego rozbudowanego produktu.
Interesuje nas:

- sposób myślenia,
- decyzje projektowe,
- umiejętność pracy na danych,
- czytelność wizualna. Duży plus za fajny design.
  Nie liczy się ilość/wielkość projektu, tylko jakość połączona z prostotą i umiejętność wytłumaczenia podejścia.

Przewidujemy, że wykonanie zadania powinno zająć maksymalnie kilka godzin.
Na rozwiazanie masz dokładnie 7 dni licząc od daty otrzymania tego zadania.

## Jak zacząć i wysłać rozwiązanie

- wykonaj fork tego repozytorium na swoje konto GitHub (w nazwie repozytorium powinna zawierać się nazwa Twojego profilu GH lub imię i nazwisko - tak aby była unikatowa dla wszystkich kandydatów),
- upewnij się, że wszystkie zmiany są wypchnięte do Twojego repozytorium na GitHubie,
- wyślij link do swojego repozytorium zawierającego rozwiązanie na adres e-mail: rekrutacja@blacklabel.net

Nie wysyłaj Pull Requesta do tego repozytorium - oceniany będzie wyłącznie kod w Twoim forku.
