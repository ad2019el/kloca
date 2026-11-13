const grille = document.querySelector("#grille");

function afficherVoitures(listeVoitures) {
    grille.innerHTML = ""; // On vide la grille avant d'afficher
    
    if (listeVoitures.length === 0){
        grille.innerHTML=`
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px;">
        <h3> Aucun véhicule ne correspond à votre recherche 🚗 </h3>
        <p>Essayez de modifier vos filtres.</p>
        </div>
        `;
        return;
    }
    listeVoitures.forEach(voiture => {
        // On formate le prix pour qu'il soit lisible (ex: 1 850 000)
        const prixFormate = voiture.prix.toLocaleString('fr-FR');
        
        // On crée la carte HTML
        const carte = `
            <article class="carte-vehicule">
                <img src="${voiture.image}" alt="${voiture.marque} ${voiture.modele}">
                <div class="carte-contenu">
                    <h3>${voiture.marque} ${voiture.modele}</h3>
                    <p class="specs">${voiture.annee} · ${voiture.carburant} · ${voiture.kilometrage.toLocaleString('fr-FR')} km</p>
                    <p class="prix">${prixFormate} DZD</p>
                    <a href="fiche.html" class="btn-voir">Voir détails</a>
                </div>
            </article>
        `;
        grille.innerHTML += carte;
    });
}

// Au chargement de la page, on affiche tout
afficherVoitures(voitures);
 
const btnRechercher = document.querySelector("#btn-rechercher");
const inputTexte = document.querySelector("#recherche-texte");
const filtreMarque = document.querySelector("#filtre-marque");
const filtrePrix = document.querySelector("#filtre-prix"); // ⚠️ Correction du "t"

btnRechercher.addEventListener("click", () => {
    const texte = inputTexte.value.toLowerCase();
    const marque = filtreMarque.value;
    const prixMax = parseInt(filtrePrix.value);

    const voituresFiltrees = voitures.filter(voiture => {
        // Recherche par texte (dans la marque OU le modèle)
        const correspondTexte = voiture.marque.toLowerCase().includes(texte) || 
                                voiture.modele.toLowerCase().includes(texte);
        
        // Recherche par marque (menu déroulant)
        const correspondMarque = marque === "" || voiture.marque.toLowerCase() === marque.toLowerCase();
        
        // Recherche par prix
        const correspondPrix = voiture.prix <= prixMax;

        return correspondTexte && correspondMarque && correspondPrix;
    });

    afficherVoitures(voituresFiltrees);
});

// Recherche en direct
inputTexte.addEventListener("input", () => btnRechercher.click());
filtreMarque.addEventListener("change", () => btnRechercher.click());
filtrePrix.addEventListener("change", () => btnRechercher.click()); // ⚠️ Correction ici aussi