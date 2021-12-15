// autobind decorator
function autobind(
	_target: any,
	_methodName: string,
	descriptor: PropertyDescriptor
) {
	const originalMethod = descriptor.value;
	const adjDescriptor: PropertyDescriptor = {
		configurable: true,
		get() {
			const boundFn = originalMethod.bind(this);
			return boundFn;
		},
	};
	return adjDescriptor;
}

class ProjectInput {
	templateElement: HTMLTemplateElement;
	hostElement: HTMLDivElement;
	element: HTMLFormElement;
	titleInputElement: HTMLInputElement;
	descriptionInputElement: HTMLInputElement;
	peopleInputElement: HTMLInputElement;

	constructor() {
		this.templateElement = document.querySelector("#project-input")!;
		this.hostElement = document.querySelector("#app")!;

		const importedNode = document.importNode(
			this.templateElement.content,
			true
		);
		this.element = importedNode.firstElementChild as HTMLFormElement;
		this.element.id = "user-input";

		this.titleInputElement = this.element.querySelector("#title")!;
		this.descriptionInputElement =
			this.element.querySelector("#description")!;
		this.peopleInputElement = this.element.querySelector("#people")!;

		this.configure();
		this.attach();
	}

	@autobind
	private submitHandler(event: Event) {
		event.preventDefault();
	}

	private configure() {
		this.element.addEventListener("submit", this.submitHandler.bind(this));
	}

	private attach() {
		this.hostElement.insertAdjacentElement("afterbegin", this.element);
	}
}

const prjInput = new ProjectInput();
