# MyTeams control

This control show all Teams the user has access (joined),and for each Team the user can see the channels has permissions and quick open the channel or if callback is specified can return the Team Id and Channel Id for use in App.

The user can quick see the members and owner of group.
This control use [mgt-toolkit](https://docs.microsoft.com/en-us/graph/toolkit/overview) component [People](https://docs.microsoft.com/en-us/graph/toolkit/components/people) that can be configured to show Person Card on hover.

Here is an example of the control:

![myTeams](../assets/myteams01.gif)

![myTeams](../assets/myteams02.gif)

![myTeams](../assets/myteams01.png)

## How to use this control in your solutions

- Check that you installed the `@pnp/spfx-controls-react` dependency. Check out the [getting started](../../#getting-started) page for more information about installing the dependency.
- Import the control into your component:

```TypeScript
import { MyTeams } from "@pnp/spfx-controls-react/lib/MyTeams";
```

- Use the `MyTeams` control in your code as follows:

```TypeScript
 <MyTeams
            title="My Teams"
            webPartContext={context}
            themeVariant={themeVariant}/>
```

```TypeScript
  <MyTeams
            title="My Teams"
            webPartContext={context}
            themeVariant={themeVariant}
            enablePersonCardInteraction={true}
            onSelectedChannel={onSelectedChannel}
          />
```


- The `onSelectedChannel` callback returns the teamId and ChannelId and can be implemented as follows:

```TypeScript
 const  onSelectedChannel = (teamsId: string, channelId: string) => {
        console.log("TeamsId", teamsId);
        console.log("ChannelId", channelId);
  };
```

## Implementation


The `MyTeams` control can be configured with the following properties:

| Property | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| webPartContext | WebPartContext | yes | The context object of the SPFx loaded webpart |
| title | string | no | Title of WebPart  |
| themeVariant |IReadonlyTheme | no | themeVariant |
| enablePersonCardInteraction | boolean | no | Show Person Card on hover |
| onSelectedChannel | (teamId:string,channelId:string) => void; | no | callBack with TeamId and ChannelId Selected |


 ## MSGraph Permissions required

This control required the flowing scopes :

at least : Team.ReadBasic.All, Channel.ReadBasic.All, TeamMember.Read.All
and all Scopes used by [mgt-people](https://docs.microsoft.com/en-us/graph/toolkit/components/people),
and [Person-Card](https://docs.microsoft.com/en-us/graph/toolkit/components/person-card) components 
