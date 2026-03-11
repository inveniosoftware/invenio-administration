# -*- coding: utf-8 -*-
#
# This file is part of Invenio.
# Copyright (C) 2022-2024 CERN.
# Copyright (C) 2023 Graz University of Technology.
# Copyright (C) 2024 KTH Royal Institute of Technology.
#
# Invenio is free software; you can redistribute it and/or modify it
# under the terms of the MIT License; see LICENSE file for more details.

"""Invenio Administration menu module."""

import urllib.parse
from collections import defaultdict

from flask import request
from invenio_i18n import lazy_gettext as _
from invenio_theme.proxies import current_theme_icons
from speaklater import make_lazy_string

from invenio_administration.permissions import (
    administration_permission,
    administration_view_permission,
)


class AdminMenu:
    """Main class for the admin menu."""

    def __init__(self):
        """Constructor."""
        self._menu_items = []

    @property
    def items(self):
        """Return all raw menu items."""
        return self._menu_items

    def register_menu_entries(self, flask_menu_instance, menu_key="admin_navigation"):
        """Register all menu items to a flask menu instance."""
        main_menu = flask_menu_instance.submenu(menu_key)

        # items without category go first and the rest are sorted alphabetically
        ordered_menu_items = sorted(
            self._menu_items,
            key=lambda menu_item: (menu_item.category is not None, menu_item.category),
        )

        # Group items by category to set up category visibility
        items_by_category = defaultdict(list)
        for menu_entry in ordered_menu_items:
            if not menu_entry.disabled() and menu_entry.category:
                items_by_category[menu_entry.category].append(menu_entry)

        # Track registered categories
        registered_categories = set()

        for menu_entry in ordered_menu_items:
            category = menu_entry.category
            name = menu_entry.name
            endpoint = menu_entry.endpoint
            order = menu_entry.order
            active_when = menu_entry.active_when
            label = menu_entry.label
            icon = menu_entry.icon
            disabled = menu_entry.disabled
            visible_when = menu_entry.visible_when

            if disabled():
                continue

            if category:
                category_menu = main_menu.submenu(category)

                # Register category header with visible_when that checks if any child is visible
                if category not in registered_categories:
                    category_items = items_by_category[category]

                    def make_category_visible_when(items):
                        def check_any_visible():
                            # Category is visible if any of its items are visible
                            for item in items:
                                if item.visible_when is None:
                                    return True
                                elif item.visible_when():
                                    return True
                            return False

                        return check_any_visible

                    category_menu.register(
                        text=category,
                        visible_when=make_category_visible_when(category_items),
                    )
                    registered_categories.add(category)

                category_menu.submenu(name).register(
                    endpoint=endpoint,
                    text=label,
                    order=order,
                    active_when=active_when or self.sub_content_active_when,
                    visible_when=visible_when,
                    icon=icon,
                )
            else:
                main_menu.submenu(name).register(
                    endpoint=endpoint,
                    text=label,
                    order=order,
                    active_when=active_when or self.default_active_when,
                    visible_when=visible_when,
                    icon=icon,
                )

    def register_admin_entry(self, current_menu, endpoint):
        """Register administration entry as the last one."""
        current_menu.submenu("profile-admin.administration").register(
            f"{endpoint}.dashboard",
            _(
                "%(icon)s Administration",
                icon=make_lazy_string(
                    lambda: f'<i class="{current_theme_icons.cogs}"></i>'
                ),
            ),
            order=1,
            visible_when=lambda: administration_view_permission.can(),
        )

    def add_menu_item(self, item, index=None):
        """Add menu item."""
        if not isinstance(item, MenuItem):
            return TypeError(_("Item should be MenuItem instance."))

        if index:
            self._menu_items[index] = item
            return

        self._menu_items.append(item)

    def add_view_to_menu(self, view, index=None):
        """Add menu item from view."""
        permission = getattr(view, "permission", administration_permission)
        visible_when = lambda: permission.can()

        menu_item = MenuItem(
            endpoint=view.endpoint,
            name=view.name,
            category=view.category,
            label=view.menu_label,
            order=view.order,
            icon_key=view.icon,
            disabled=view.disabled,
            visible_when=visible_when,
        )

        self.add_menu_item(menu_item, index)

    @staticmethod
    def default_active_when(self):
        """Default condition for the menu item active state."""
        return request.endpoint == self._endpoint

    @staticmethod
    def sub_content_active_when(self):
        """Condition for menu items with sub content.

        Makes all pages with derivative URL highlight the parent menu.
        """
        menu_url = urllib.parse.urlparse(self.url)
        request_url = urllib.parse.urlparse(request.url_rule.rule)

        return request_url.path == menu_url.path or request_url.path.startswith(
            f"{menu_url.path}/"
        )


class MenuItem:
    """Class for menu item."""

    def __init__(
        self,
        name="",
        endpoint="",
        category="",
        order=0,
        icon_key=None,
        active_when=None,
        label="",
        disabled=lambda x: False,
        visible_when=None,
    ):
        """Constructor."""
        self.name = name
        self.endpoint = endpoint
        self.category = category
        self.order = order
        self.active_when = active_when
        self.icon_key = icon_key
        self.label = label
        self.disabled = disabled
        self.visible_when = visible_when

    @property
    def icon(self):
        """Return corresponding template path for icon."""
        if not self.icon_key:
            return None

        return current_theme_icons[self.icon_key]
