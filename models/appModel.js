import { requestGet } from '../utils/requestApi'

export const app = {
    // Etats initiaux du modèle
    state: {
        name: '',
        informations: []
    },
    // Modifier les états initiaux
    reducers: {
        setName(state, { name }) {
            return { ...state, name };
        },
        setInformations(state, informations) {
            return { ...state, informations };
        },
    },
    // Permet de créer des fonctions pour gérer des actions diverses
    effects: (dispatch) => ({

        async storeName(payload) {
            const { name } = payload;
            if (name !== '') {
                await AsyncStorage.setItem('name', name);
                const action = {
                    type: "app/setName",
                    payload: { name }
                };
                dispatch(action);
                NavigationService.navigate('App');
            }
        },

        async getMeteoInformations(location) {
            if (location) {
                const { coords: { latitude, longitude } } = location
                const response = await requestGet('find', `lat=${latitude}&lon=${longitude}&cnt=10&units=metric`);
                if (response) {
                    const listFilter = [];
                    const listTemp = response.list.filter(element => {
                        const name = element.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "") // test sans accents
                        if (!listFilter.includes(name)) { // test si name est deja dans le tableau
                            listFilter.push(name)
                            return true
                        } else {
                            return false
                        }
                    })
                    this.setInformations(listTemp);
                }
            }
        }
    })
};