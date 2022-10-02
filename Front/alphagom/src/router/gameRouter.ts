// MagicCastle
import MagicCastleDialogView from "@/views/MagicCastle/MagicCastleDialogView.vue";
import MagicCastleStartView from "@/views/MagicCastle/MagicCastleStartView.vue";
// Swamp
import SwampStartView from "@/views/Swamp/SwampStartView.vue";
import SwampDialogView from "@/views/Swamp/SwampDialogView.vue";
import ChaseGameView from "@/views/Swamp/ChaseGameView.vue";
import KingCureGameView from "@/views/Swamp/KingCureGameView.vue";
// DarkCave
import DarkCaveDialogView from "@/views/DarkCave/DarkCaveDialogView.vue";
import DarkCaveStartView from "@/views/DarkCave/DarkCaveStartView.vue";
import TongueTwisterGameView from "@/views/DarkCave/TongueTwisterGameView.vue";
// Sky
import SkyStartView from "@/views/Sky/SkyStartView.vue";
import SkyDialogView from "@/views/Sky/SkyDialogView.vue";
import BirdProverbGameView from "@/views/Sky/BirdProverbGameView.vue";
// Etc
import StageChangeView from "@/views/StageChangeView.vue";
import MapView from "@/views/MapView.vue";

export default [
  {
    path: "/stage/magicCastle/dialog",
    name: "MagicCastleDialogView",
    component: MagicCastleDialogView,
  },
  {
    path: "/stage/magicCastle/start",
    name: "magicCastleStartView",
    component: MagicCastleStartView,
  },
  {
    path: "/stage/swamp/start",
    name: "swampStartView",
    component: SwampStartView,
  },
  {
    path: "/stage/swamp/dialog/:dialogNum",
    name: "swampDialog",
    component: SwampDialogView,
  },
  {
    path: "/stage/swamp/game/chaseGame",
    name: "chaseGameView",
    component: ChaseGameView,
  },
  {
    path: "/stage/swamp/game/kingCureGame",
    name: "kingCureGameView",
    component: KingCureGameView,
  },
  {
    path: "/stage/darkCave/dialog/:dialogNum",
    name: "darkCaveDialogView",
    component: DarkCaveDialogView,
  },
  {
    path: "/stage/darkCave/start",
    name: "darkCaveStartView",
    component: DarkCaveStartView,
  },
  {
    path: "/stage/darkCave/game/tongueTwisterGame",
    name: "tongueTwisterGameView",
    component: TongueTwisterGameView,
  },
  {
    path: "/stage/sky/start",
    name: "skyStartView",
    component: SkyStartView,
  },
  {
    path: "/stage/sky/dialog/:dialogNum",
    name: "skyDialogView",
    component: SkyDialogView,
  },
  {
    path: "/stage/sky/game/birdProverbGame",
    name: "birdProverbGameView",
    component: BirdProverbGameView,
  },
  {
    path: "/stage/stageChange",
    name: "stageChangeView",
    component: StageChangeView,
  },
  {
    path: "/map",
    name: "mapView",
    component: MapView,
  },
];
