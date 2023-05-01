let initialiseAbilityScores = {
        "strengthAbilityScore": 10,
        "dexterityAbilityScore": 10,
        "constitutionAbilityScore": 10,
        "intelligenceAbilityScore": 10,
        "wisdomAbilityScore": 10,
        "charismaAbilityScore": 10
    };

class CharacterInfo {
    constructor(playerName, characterName, characterGender, characterRace, characterSubRace, characterClass, characterSubClass, characterBackground, characterAlignment, characterLevel, initialiseAbilityScores) {
        this.playerName = playerName;
        this.characterName = characterName;
        this.characterGender = characterGender;
        this.characterRace = characterRace;
        this.characterSubRace = characterSubRace;
        this.characterClass = characterClass;
        this.characterSubClass = characterSubClass;
        this.characterBackground = characterBackground;
        this.characterAlignment = characterAlignment;
        this.characterLevel = characterLevel;
        this.strengthBaseAbilityScore = initialiseAbilityScores.strengthAbilityScore;
        this.dexterityBaseAbilityScore = initialiseAbilityScores.dexterityAbilityScore;
        this.constitutionBaseAbilityScore = initialiseAbilityScores.constitutionAbilityScore;
        this.intelligenceBaseAbilityScore = initialiseAbilityScores.intelligenceAbilityScore;
        this.wisdomBaseAbilityScore = initialiseAbilityScores.wisdomAbilityScore;
        this.charismaBaseAbilityScore = initialiseAbilityScores.charismaAbilityScore;
    }
    /* getters */
    get proficiencyBonus() {
        return this.calcProficiencyBonus();
    }

    /* methods */
    calcProficiencyBonus() {
        return Math.ceil(this.characterLevel/4)+1 
    }
}

const currentAbilityScore = (base, asiTotal, featTotal, itemTotal, buffDebuffTotal) => {
    return base + asiTotal + featTotal + itemTotal + buffDebuffTotal
}

const abilityBonus = (abilityScore) => {
    return Math.floor(abilityScore / 2)- 5;
}

const savingThrow = (abilityBonus, proficient, proficiencyBonus) => {
    if(proficient) {
        return abilityBonus + proficiencyBonus;
    }
    return abilityBonus;
}

const initiativeBonus = (dexterityBonus, classFeatureBonus, featBonus, itemBonus) => {
    return dexterityBonus + classFeatureBonus + featBonus + itemBonus

}

/* doesn't account for multiclassing */
const currentHitPoints = (constitutionBonus, characterLevel, featBonus, itemBonus, hitDieMax, rolledHP, rolledArr) => {
    /* maybe only feed in an array with appropriate value for each level?? */
    let accumulatedHP = Math.ceil((1+hitDieMax)/2) * (characterLevel-1);
    if(rolledHP) {
        accumulatedHP=rolledArr.reduce((a,b)=>a+b);
    };
    return hitDieMax + (characterLevel * constitutionBonus) + accumulatedHP + featBonus + itemBonus; 

}