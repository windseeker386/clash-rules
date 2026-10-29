// Stable one-time bootstrap. Remote rule providers remain GitHub-managed.
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

  // Exclude Synology hosts from Fake-IP without replacing subscription DNS settings.
  // Applies only to Fake-IP with blacklist-style filtering.
  if (config.dns && config.dns["enhanced-mode"] === "fake-ip") {
    const mode = config.dns["fake-ip-filter-mode"] ?? "blacklist";
    if (mode === "blacklist") {
      const existing = Array.isArray(config.dns["fake-ip-filter"])
        ? config.dns["fake-ip-filter"]
        : [];
      config.dns["fake-ip-filter"] = [
        ...new Set([
          ...existing,
          "+.synology.me",
          "+.synology.com",
          "+.quickconnect.to",
          "+.quickconnect.cn"
        ])
      ];
    }
  }
  return config;
}
