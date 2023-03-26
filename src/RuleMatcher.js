class RuleMatcher {
	constructor(rules) {
		this.rules = rules;
	}

	match(contentUrl) {
		for (var rule of this.rules) {
			for (var linkPattern of rule.linkPatterns) {
				if (linkPattern == contentUrl) {
					return {rule: rule, contentId: null}
				}
				var matching = contentUrl.match(new RegExp('^' + linkPattern + '$'));
				if (matching != null) {
					var contentId = matching[1];
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