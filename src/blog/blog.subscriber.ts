import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from "typeorm";

import { JSDOM } from "jsdom";

import { Blog } from "./blog.entity";

@EventSubscriber()
export class BlogEventSubscriber implements EntitySubscriberInterface<Blog> {
  listenTo(): typeof Blog {
    return Blog;
  }

  afterInsert(event: InsertEvent<Blog>): Promise<any> | void {
    const content = event.entity.content;
    const dom = new JSDOM(content);
    const images = dom.window.document.querySelectorAll("img[src]");
    const imageSrcs = Array.from(images).map((img) => img.getAttribute("src").trim());
    console.log("Extracted image srcs:", imageSrcs);
  }
}
