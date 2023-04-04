const CreateExp = linkPattern=> {
	linkPattern = linkPattern.replace("?","\\?");
	new RegExp('^' + linkPattern + '$')
}

class RuleMatcher {
	constructor(rules) {
		this.rules = rules;
	}

	match(contentUrl) {
		let contentIds = null;
		for (let rule of this.rules) {
			for (let linkPattern of rule.linkPatterns) {
				if (linkPattern === contentUrl) {
					return { rule, contentIds };
				}
				let matching = contentUrl.match(CreateExp(linkPattern));
				if (matching != null) {
					let contentId = matching[1];
					if (rule?.params?.idPrefix) {
						contentIds = [contentId, rule.params.idPrefix];
					} else {
						contentIds = [contentId]
					}
					return { rule, contentIds }
				}
			}
		}
		return {};
	}
}

export default RuleMatcher