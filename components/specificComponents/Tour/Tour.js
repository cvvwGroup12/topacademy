import React, { Component } from "react";
import css from "./Tour.module.scss";
import Headermenu from "../../genericComponents/Headermenu/Headermenu";
import Hero from "../../genericComponents/Hero/Hero";
import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import { RichTextToHTML } from "../../../functions/storyBlokRichTextRenderer";

export default class Tour extends Component {

	constructor(props) {
		super(props);
		}

	render() {
		return (
			<div {...storyblokEditable(this.props.blok)}>
				<Headermenu blok={this.props.menu.content}></Headermenu>

				<main>
					<Hero blok={this.props.blok} contentTypeTag="course" />
					<div className={css["tour-page__main-content"]}>
						<div id="tour-page__short-description" key="tour-page__short-description" className={css["tour-page__short-description"]}>
							<section className={css["rich-text-section--with-navigator"]}>
								<h2 className={css["rich-text-section__title"]}>About the tour</h2>
								<div className={css["rich-text-section__rich-text"]}>{RichTextToHTML({ document: this.props.blok.description })}</div>
							</section>
						</div>
						<div id="tour-page__short-description" key="tour-page__short-description" className={css["tour-page__short-description"]}>
							
						</div>
					</div>

				</main>
			</div>
		);

	}
}