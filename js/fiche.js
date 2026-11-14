const params = new URLSearchParams(window.location.search);
const idVoiture = parseInt(params.get("id"));

const voiture = voitures.find(v => v.id === idVoiture);

if(!voiture){
    window.location.href = "voitures.html";
} else {
    const container = document.querySelector("#fiche-container");
    const prixFormate = voiture.prix.toLocaleString('fr-FR');
    // Utilisation de l'opérateur ?? pour afficher "Manuelle" si la boite n'est pas définie
    const boite = voiture.boite ?? "Manuelle"; 

    container.innerHTML = `
    <a href="voitures.html" class="btn-retour"> ← Retour</a>
    
    <div class="fiche-images">
        <img src="${voiture.image}" alt="${voiture.marque} ${voiture.modele}" class="image-principale">
        <div class="miniatures">
            <img src="${voiture.image}" alt="miniature 1">
            <img src="${voiture.image}" alt="miniature 2"> 
            <img src="${voiture.image}" alt="miniature 3">
        </div>
    </div> 
    
    <div class="fiche-infos">
        <h1>${voiture.marque} ${voiture.modele}</h1>
        <p class="localisation">📍${voiture.localisation} · Publié récemment</p>
        <p class="prix-grand">${prixFormate} DZD</p>
        
        <h2>Caractéristiques</h2>
        <ul class="specs-liste">
            <li><strong>Année :</strong> ${voiture.annee}</li>
            <li><strong>Kilométrage :</strong> ${voiture.kilometrage.toLocaleString('fr-FR')} km</li>
            <li><strong>Carburant :</strong> ${voiture.carburant}</li>
            <li><strong>Boite :</strong> ${boite}</li>
            <li><strong>Etat :</strong> Très bon</li>
        </ul> <!-- ✅ Balise ul fermée ici -->
        
        <h2>Description</h2>
        <p>Véhicule très bien entretenu. Prix transparent affiché en toute clarté.</p>
        
        <button class="btn-contact" id="btn-contact"> Contacter le vendeur</button>
    </div>
    `;

    // Gestion de la galerie
    const imagePrincipale = document.querySelector(".image-principale");
    const miniatures = document.querySelectorAll(".miniatures img");

    miniatures.forEach(miniature => {
        miniature.addEventListener("click", () => {
            imagePrincipale.src = miniature.src;
        });
    });

    // Gestion du bouton contact
    document.querySelector("#btn-contact").addEventListener("click", () => {
        alert(`Vous souhaitez contacter le vendeur pour la ${voiture.marque} ${voiture.modele} au prix de ${prixFormate} DZD.`);
    });
}