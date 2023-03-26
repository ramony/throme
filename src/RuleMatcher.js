class RuleMatcher {
	constructor(rules) {
		this.rules = rules;
	}

	match(contentUrl) {
		for (let rule of this.rules) {
			for (let linkPattern of rule.linkPatterns) {
				if (linkPattern == contentUrl) {
					return {rule: rule, contentId: null}
				}
				let matching = contentUrl.match(new RegExp('^' + linkPattern + '$'));
				if (matching != null) {
					let contentId = matching[1];
					if (rule?.params?.idPrefix) {
						contentId = [contentId, rule.params.idPrefix];
					} else {
						contentId = [contentId]
					}
					return {rule: rule, contentId: contentId}
				}
			}
		}
		return {};
	}
}

export default RuleMatcher