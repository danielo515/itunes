import React from "react";
import Card from "@material-ui/core/Card";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import { Button, Welcome } from "@storybook/react/demo";

import Player from "../src/components/Player/Player";
import Controls from "../src/components/Player/Controls";
import { MobilePlaylist } from "../src/components/PlayList";

const inCard = component => () => <Card>{component}</Card>;

const songsList = [
  { title: "First song", author: "Da man" },
  { title: "Second song", author: "That man" },
  { title: "Third song", author: "A woman" }
];
storiesOf("Playlist", module)
  .add("Some songs no favorites", inCard(<MobilePlaylist data={songsList} />))
  .add(
    "One favorite",
    inCard(<MobilePlaylist data={songsList} favorites={["First song"]} />)
  );

storiesOf("Player controls", module)
  .add("Default", inCard(<Controls />))
  .add("Almost all volume", inCard(<Controls volume={0.9} />))
  .add("Playing", inCard(<Controls volume={1} playing={true} />))
  .add("Muted", inCard(<Controls volume={0.5} muted />));

storiesOf("Player", module)
  .add("No cover", inCard(<Player />))
  .add(
    "With cover",
    inCard(
      <Player
        song={{ cover: "https://www.bensound.com/bensound-img/dreams.jpg" }}
      />
    )
  );
