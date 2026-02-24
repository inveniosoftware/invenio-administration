# -*- coding: utf-8 -*-
#
# This file is part of Invenio.
# Copyright (C) 2022 CERN.
#
# Invenio is free software; you can redistribute it and/or modify it
# under the terms of the MIT License; see LICENSE file for more details.

"""Configuration for Invenio-Admin."""

from invenio_administration.permissions import administration_permission

ADMINISTRATION_BASE_TEMPLATE = "invenio_administration/base.html"
"""Admin panel base template.
By default (``None``) uses the Flask-Admin template."""

ADMINISTRATION_APPNAME = "Invenio-Administration"
"""Name of the Flask-Admin app (also the page title of admin panel)."""

ADMINISTRATION_DASHBOARD_VIEW = (
    "invenio_administration.views.dashboard.AdminDashboardView"
)
"""Administration dashboard view class."""

ADMINISTRATION_THEME_BASE_TEMPLATE = "invenio_theme/page.html"
"""Administration base template."""

ADMINISTRATION_DISPLAY_VERSIONS = []
"""Display packages versions in the admin panel side bar.

Accepts a list of tuples in the format (package name, version).
Example: [("my-app", "v1.3.2")]
"""

ADMINISTRATION_MENU_VISIBLE_WHEN = lambda: administration_permission.can()
"""Custom callable to control administration menu visibility.

If set, this callable will be used instead of the default permission check
to determine whether the "Administration" menu appears in the user profile menu.
The callable should return True if the menu should be visible, False otherwise.

Default: lambda: administration_permission.can()
Example: lambda: my_custom_permission_check()
"""
