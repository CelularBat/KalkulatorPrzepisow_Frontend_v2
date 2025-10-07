import React from 'react';
import './Home/Home.scss';

function Home({}) {
    return (
        <div className='Home'>
            <div className='WelcomeScreen'>
                <h2>Witaj w kalkulatorze przepisów !</h2>
                <div className='header-line'/>
                <ul>
                    <li>Aplikacji dla osób o rygorystycznych dietach i tych liczacych kalorie.</li>
                    <li>Załóż konto, dodaj do bazy produkty z lodówki, albo korzystaj już z tych dodanych przez innych użytkowników</li>
                    <li>Podziel się własnymi przepisami, a aplikacja automatycznie obliczy ich wartośc odżywczą</li>
                    <li>W przyszłości integracja z bazą Open Food Facts!</li>
                </ul>

            </div>   
        </div>
    );
}

export default Home;