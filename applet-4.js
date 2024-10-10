class AnimeCharacterList {

    constructor(dataUrl) {
        this.dataUrl = dataUrl;
        this.characters = [];
        this.init();
    }   

    async init() {
        await this.fetchData();
        this.renderCharacterList(this.characters);
        this.bindSearchEvent();
    }

    async fetchData() {
        try {
            const response = await fetch(this.dataUrl);
            this.characters = await response.json();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    renderCharacterList(characters) {
        const characterListContainer = document.getElementById('characterList');
        characterListContainer.innerHTML = characters.map(character =>
            `<button class="btn btn-primary" style="margin-top:15px; 
                                                    width:25rem">
                ${character.character_name} | ${character.character_anime}
            </button><br>`
        ).join('');
    }

    bindSearchEvent() {
        const characterSearchBar = document.getElementById('characterSearchBar');
        const characterSearchListContainer = document.getElementById('characterSearchList');

        characterSearchBar.addEventListener('input', () => {
            this.filterCharacters(characterSearchBar.value, characterSearchListContainer);
        });

        this.renderCharacterList(this.characters, characterSearchListContainer);
    }

    filterCharacters(query, searchListContainer) {
        const filteredCharacters = this.characters.filter(character => {
            const fullName = `${character.character_name} ${character.character_anime}`;
            return fullName.toLowerCase().includes(query.toLowerCase());
        });

        searchListContainer.innerHTML = '';

        this.renderCharacterList(filteredCharacters, searchListContainer);
    }

}

const characterList = new AnimeCharacterList('applet-4.json');