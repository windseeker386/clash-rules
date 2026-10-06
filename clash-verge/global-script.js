// Prepend the personal remote ruleset while preserving subscription rules.
function main(config, profileName) {
  const target = "🚀 节点选择";
  const exists = (config["proxy-groups"] ?? []).some(g => g.name === target)
    || (config.proxies ?? []).some(p => p.name === target);
  if (!exists) throw new Error("Personal rules: missing proxy group " + target);
  const rule = "RULE-SET,personal-custom-proxy," + target;
  config.rules = [rule, ...(config.rules ?? []).filter(r => r !== rule)];
  return config;
}
