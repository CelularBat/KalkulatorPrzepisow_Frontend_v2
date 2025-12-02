import React from 'react';
import './Home.scss';
import useRecipeStore from '@/API/recipeStore';
import { Carousel } from 'primereact/carousel';
import RecipeCard from './Home/RecipeCard';
import { useInitialTransition } from '@hooks/useInitialTransition';

function Home({ }) {
    const { latestRecipes,
        fetchLatestRecipes } = useRecipeStore();

    React.useEffect(() => {
        fetchLatestRecipes();
    }, []);

    const welcome_Ref = React.useRef(null);
    useInitialTransition(welcome_Ref,2000,{ transform: "translateY(-90px)", backgroundColor: "green",opacity:0});

    return (
        <div className='Home'>

            <div className='WelcomeScreen' ref={welcome_Ref}>
                <h2>Witaj w kalkulatorze przepisów !</h2>
                <div className='header-line' />
                <ul>
                    <li>Aplikacji dla osób stosujących rygorytyczne diety i tych liczacych kalorie.</li>
                    <li>Załóż konto, dodaj do bazy produkty z lodówki, albo korzystaj już z tych dodanych przez innych użytkowników</li>
                    <li>Podziel się własnymi przepisami, a aplikacja automatycznie obliczy ich wartośc odżywczą</li>
                    <li>W przyszłości integracja z bazą Open Food Facts!</li>
                </ul>

            </div>
            <Carousel value={latestRecipes} numVisible={2} numScroll={1}
                autoplayInterval={5000} itemTemplate={(productInfo)=><RecipeCard productInfo={productInfo}/>}
                className='Carousel'
            />

        </div>
    );
}


export default Home;