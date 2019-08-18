# Filmstrip Layout control

This control renders a responsive filmstrip layout for your web parts.  The filmstrip layout behaves according to the [SharePoint web part layouts design pattern](https://docs.microsoft.com/en-us/sharepoint/dev/design/layout-patterns#filmstrip-layout).

![Filmstrip Layout Control](../assets/FilmstripLayout.gif)

Although it is best used with the Fabric UI [DocumentCard control](https://developer.microsoft.com/en-us/fabric#/controls/web/documentcard), it will render any rectangular content you wish to display.

## How to use this control in your solutions

- Check that you installed the `@pnp/spfx-controls-react` dependency. Check out the [getting started](../#getting-started) page for more information about installing the dependency.
- Import the following modules to your component:

```TypeScript
import { FilmstripLayout } from "@pnp/spfx-controls-react/lib/FilmstripLayout";
```

- Retrieve the items you wish to display in your grid control. For example, you can place them in your component's `state`. Your items can be anything you'd like. Our sample data defines a `thumbnail`, `title`, `name`, `profileImageSrc`, `location` and `activity` to coincide with the Fabric UI `DocumentCard` elements, but you can use any properties you need.

```TypeScript
// This sample places loads items in the constructor. You may wish to load
// your items in the componentDidUpdate
constructor(props: IMyWebPartProps) {
    super(props);

    this.state = {
      items:  [{
        thumbnail: "https://lorempixel.com/400/200/technics/1/",
        title: "Adventures in SPFx",
        name: "Perry Losselyong",
        profileImageSrc: "https://robohash.org/blanditiisadlabore.png?size=50x50&set=set1",
        location: "SharePoint",
        activity: "3/13/2019"
      }, {
        thumbnail: "https://lorempixel.com/400/200/technics/2",
        title: "The Wild, Untold Story of SharePoint!",
        name: "Ebonee Gallyhaock",
        profileImageSrc: "https://robohash.org/delectusetcorporis.bmp?size=50x50&set=set1",
        location: "SharePoint",
        activity: "6/29/2019"
      }, {
        thumbnail: "https://lorempixel.com/400/200/technics/3",
        title: "Low Code Solutions: PowerApps",
        name: "Seward Keith",
        profileImageSrc: "https://robohash.org/asperioresautquasi.jpg?size=50x50&set=set1",
        location: "PowerApps",
        activity: "12/31/2018"
      }, {
        thumbnail: "https://lorempixel.com/400/200/technics/4",
        title: "Not Your Grandpa's SharePoint",
        name: "Sharona Selkirk",
        profileImageSrc: "https://robohash.org/velnammolestiae.png?size=50x50&set=set1",
        location: "SharePoint",
        activity: "11/20/2018"
      }, {
        thumbnail: "https://lorempixel.com/400/200/technics/5/",
        title: "Get with the Flow",
        name: "Boyce Batstone",
        profileImageSrc: "https://robohash.org/nulladistinctiomollitia.jpg?size=50x50&set=set1",
        location: "Flow",
        activity: "5/26/2019"
      }]
    };
  }
```

- Use the `FilmstripLayout` control in your code as follows. The `ariaLabel` prop is optional, but it is recommended:

```TypeScript
 <FilmstripLayout
  ariaLabel={"Sample filmstrip layout web part, showing sample items., Use right and left arrow keys to navigate between cards in the film strip."}
  >

  </FilmstripLayout>
```

- To render items within your filmstrip, simply pass them as children elements, between the `<FilmstripLayout>` and `</FilmstripLayout>` nodes. For example, we will render a `DocumentCard` control for every item:

```TypeScript
import {
  DocumentCard,
  DocumentCardActivity,
  DocumentCardPreview,
  DocumentCardDetails,
  DocumentCardTitle,
  IDocumentCardPreviewProps,
  DocumentCardLocation,
  DocumentCardType
} from 'office-ui-fabric-react/lib/DocumentCard';
import { ImageFit } from 'office-ui-fabric-react/lib/Image';
import { ISize } from 'office-ui-fabric-react/lib/Utilities';

...

 <FilmstripLayout>
  {this.state.items.map((item: any, _index: number) => {
    const previewProps: IDocumentCardPreviewProps = {
      previewImages: [
        {
          previewImageSrc: item.thumbnail,
          imageFit: ImageFit.cover,
          height: 130
        }
      ]
    };

    return <div
      data-is-focusable={true}
      role="listitem"
      aria-label={item.title}
    >
      <DocumentCard
        type={DocumentCardType.normal}
        onClick={(ev: React.SyntheticEvent<HTMLElement>) => alert("You clicked on an item")}
      >
        <DocumentCardPreview {...previewProps} />
        <DocumentCardLocation location={item.location} />
        <DocumentCardDetails>
          <DocumentCardTitle
            title={item.title}
            shouldTruncate={true}
          />
          <DocumentCardActivity
            activity={item.activity}
            people={[{ name: item.name, profileImageSrc: item.profileImageSrc }]}
          />
        </DocumentCardDetails>
      </DocumentCard>
    </div>;
  })}
</FilmstripLayout>
```

## Implementation

The filmstrip layout control can be configured with the following properties:

| Property | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| ariaLabel | string | no | The accessible text you wish to display for the grid control. We recommend that you use something like `"List of content. Use right and left arrow keys to navigate between cards in the film strip."`. |

![Telemetry](https://telemetry.sharepointpnp.com/sp-dev-fx-controls-react/wiki/controls/filmstripLayout)
