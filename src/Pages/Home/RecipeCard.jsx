import React from 'react';
import './RecipeCard.scss';
import { useNavigate } from 'react-router-dom';


function RecipeCard({ productInfo }) {
    const navigate = useNavigate();

    const energy = React.useMemo(() => {
        
            let en = productInfo.productsList.reduce(
                (acc, p) => ({
                    kcal: acc.kcal + p.kcal * (p.portion / 100),
                    kj: acc.kj + p.kj * (p.portion / 100)
                }),
                { kcal: 0, kj: 0 }
            )
            en = {kcal: Math.round(en.kcal) , kj: Math.round(en.kj)}
            return en;
        
    },
        [productInfo]
    );

    return (
        <div className='RecipeCard'>
            <div className="recipe-card"
                onClick={() => navigate(`gallery/?id=${productInfo._id}`)}
            >

                <div className="recipe-card__image-container">
                    <img
                        className="recipe-card__image"
                        src={productInfo.photos[0]}
                        alt={productInfo.name}
                    />
                </div>

                <div className="recipe-card__content">
                    <h3 className="recipe-card__title">{productInfo.name}</h3>
                    <p className="recipe-card__details">
                        Kalorie: {`${energy.kcal} Kcal (${energy.kj} Kj)`}
                    </p>
                </div>

            </div>

        </div>
    );
}

export default RecipeCard;