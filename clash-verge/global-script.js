// Stable one-time bootstrap. Edit remote YAML rule providers on GitHub thereafter.
function main(config, profileName) {
  const target = "🚀 节点选择";
  const exists = (config["proxy-groups"] ?? []).some(g => g.name === target)
    || (config.proxies ?? []).some(p => p.name === target);
  if (!exists) throw new Error("Personal rules: missing proxy group " + target);
  const prepended = [
    "RULE-SET,personal-direct,DIRECT",
    "RULE-SET,personal-steam-web," + target,
    "RULE-SET,personal-custom-proxy," + target
  ];
  config.rules = [
    ...prepended,
    ...(config.rules ?? []).filter(r => !prepended.includes(r))
  ];
  return config;
}
