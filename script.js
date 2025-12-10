const characters = [
  "images/characters/Amog.png",
  "images/characters/Athena.png",
  "images/characters/Bandit.png",
  "images/characters/Birdo.png",
  "images/characters/Bush.png",
  "images/characters/Calcium.png",
  "images/characters/CL4NK.png",
  "images/characters/Dicehead.png",
  "images/characters/Fox.png",
  "images/characters/Megachad.png",
  "images/characters/Monke.png",
  "images/characters/Ninja.png",
  "images/characters/Noelle.png",
  "images/characters/Ogre.png",
  "images/characters/Robinette.png",
  "images/characters/Sir_Chadwell.png",
  "images/characters/Sir_Oofie.png",
  "images/characters/Spaceman.png",
  "images/characters/Tony_McZoom.png",
  "images/characters/Vlad.png",
];

const tomes = [
  "images/tomes/Armor.png",
  "images/tomes/Attraction.png",
  "images/tomes/Blood.png",
  "images/tomes/Chaos.png",
  "images/tomes/Cooldown.png",
  "images/tomes/Cursed.png",
  "images/tomes/Damage.png",
  "images/tomes/Duration.png",
  "images/tomes/Evasion.png",
  "images/tomes/Golden.png",
  "images/tomes/Health.png",
  "images/tomes/Knockback.png",
  "images/tomes/Luck.png",
  "images/tomes/Precision.png",
  "images/tomes/ProjectileSpeed.png",
  "images/tomes/Quantity.png",
  "images/tomes/Regeneration.png",
  "images/tomes/Thorns.png",
  "images/tomes/Shield.png",
  "images/tomes/Silver.png",
  "images/tomes/Size.png",
  "images/tomes/Agility.png",
  "images/tomes/Xp.png",
];

const weapons = [
  "images/weapons/Aura.png",
  "images/weapons/Axe.png",
  "images/weapons/Bananarang.png",
  "images/weapons/BlackHole.png",
  "images/weapons/BloodMagic.png",
  "images/weapons/BluetoothDagger.png",
  "images/weapons/Bone.png",
  "images/weapons/Bow.png",
  "images/weapons/Chunkers.png",
  "images/weapons/CorruptedSword.png",
  "images/weapons/Dexecutioner.png",
  "images/weapons/Dice.png",
  "images/weapons/DragonsBreath.png",
  "images/weapons/FireStaff.png",
  "images/weapons/Flamewalker.png",
  "images/weapons/Frostwalker.png",
  "images/weapons/HeroSword.png",
  "images/weapons/Katana.png",
  "images/weapons/LightningStaff.png",
  "images/weapons/Mine.png",
  "images/weapons/PoisonFlask.png",
  "images/weapons/Revolver.png",
  "images/weapons/Shotgun.png",
  "images/weapons/Rocket.png",
  "images/weapons/Sniper.png",
  "images/weapons/SpaceNoodle.png",
  "images/weapons/Sword.png",
  "images/weapons/Tornado.png",
];

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomUnique(arr, count) {
  const n = Math.min(count, arr.length);
  const copy = arr.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, n);
}

function randomizeBuild() {
  const character = document.getElementById("characterImg");
  if (character.dataset.locked !== "true") {
    character.src = getRandom(characters);
  }

  const selectedWeapons = getRandomUnique(weapons, 4);
  const selectedTomes = getRandomUnique(tomes, 4);

  for (let i = 1; i <= 4; i++) {
    const el = document.getElementById("item" + i);
    if (el.dataset.locked !== "true") el.src = selectedWeapons[i - 1];
  }

  for (let i = 5; i <= 8; i++) {
    const el = document.getElementById("item" + i);
    if (el.dataset.locked !== "true") el.src = selectedTomes[i - 5];
  }
}

function toggleLock(event) {
  const el = event.currentTarget;
  if (el.dataset.locked === "true") {
    el.dataset.locked = "false";
    el.classList.remove("opacity-50");
  } else {
    el.dataset.locked = "true";
    el.classList.add("opacity-50");
  }
}

window.onload = () => {
  randomizeBuild();
  document.getElementById("random").onclick = randomizeBuild;

  const allImages = [document.getElementById("characterImg")];
  for (let i = 1; i <= 8; i++)
    allImages.push(document.getElementById("item" + i));

  allImages.forEach((img) => {
    img.dataset.locked = "false";
    img.addEventListener("click", toggleLock);
    img.classList.add("cursor-pointer");
  });
};

function exportBuild() {
  const characterEl = document.getElementById("characterImg");
  const data = {
    character: characterEl.src.split("/").pop().slice(0, -4),
    weapons: [],
    tomes: [],
  };

  for (let i = 1; i <= 8; i++) {
    const el = document.getElementById("item" + i);
    const name = el.src.split("/").pop().slice(0, -4);

    if (weapons.some((w) => w.includes(name))) {
      data.weapons.push(name);
    } else if (tomes.some((t) => t.includes(name))) {
      data.tomes.push(name);
    }
  }

  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "megabonk_build.json";
  a.click();

  URL.revokeObjectURL(url);
}

document.getElementById("export").onclick = exportBuild;

